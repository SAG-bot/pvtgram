import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
   apiKey: "AIzaSyD8_wAPvPzJ8r34FGrcdYae26EhmKz-mtY",
  authDomain: "privategram-706f4.firebaseapp.com",
  projectId: "privategram-706f4",
  storageBucket: "privategram-706f4.firebasestorage.app",
  messagingSenderId: "321530348112",
  appId: "1:321530348112:web:dc95df6717752ba69b0755"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await signInWithEmailAndPassword(auth, email, password);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("main").style.display = "block";
    loadFeed();
  }
});

window.uploadVideo = function () {
  const file = document.getElementById("videoFile").files[0];
  if (!file) return;

  const videoRef = ref(storage, "videos/" + Date.now() + "_" + file.name);
  const uploadTask = uploadBytesResumable(videoRef, file);

  uploadTask.on("state_changed", null, console.error, async () => {
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    await addDoc(collection(db, "posts"), {
      videoUrl: url,
      createdAt: Date.now()
    });
  });
};

function loadFeed() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    snapshot.forEach(doc => {
      const v = document.createElement("video");
      v.src = doc.data().videoUrl;
      v.controls = true;
      feed.appendChild(v);
    });
  });
}
