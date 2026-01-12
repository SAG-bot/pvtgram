// 🔥 Firebase config
//const firebaseConfig = {
   //apiKey: "AIzaSyD8_wAPvPzJ8r34FGrcdYae26EhmKz-mtY",
  //authDomain: "privategram-706f4.firebaseapp.com",
 // projectId: "privategram-706f4",
 /// storageBucket: "privategram-706f4.firebasestorage.app",
  //messagingSenderId: "321530348112",
  //appId: "1:321530348112:web:dc95df6717752ba69b0755"
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* 🔐 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyD8_wAPvPzJ8r34FGrcdYae26EhmKz-mtY",
  authDomain: "privategram-706f4.firebaseapp.com",
  projectId: "privategram-706f4",
  appId: "1:321530348112:web:dc95df6717752ba69b0755"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ELEMENTS */
const authScreen = document.getElementById("authScreen");
const appScreen = document.getElementById("appScreen");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authError = document.getElementById("authError");

/* LOGIN */
loginBtn.addEventListener("click", async () => {
  authError.textContent = "";
  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );
  } catch (err) {
    authError.textContent = err.message;
  }
});

/* SIGNUP */
signupBtn.addEventListener("click", async () => {
  authError.textContent = "";
  try {
    await createUserWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );
  } catch (err) {
    authError.textContent = err.message;
  }
});

/* LOGOUT */
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

/* AUTH STATE */
onAuthStateChanged(auth, (user) => {
  if (user) {
    authScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
  } else {
    authScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
});
