// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "vitrine-digital-bwkpl",
  "appId": "1:290789126716:web:797dff30257bb0988d0939",
  "storageBucket": "vitrine-digital-bwkpl.firebasestorage.app",
  "apiKey": "AIzaSyCd4GYe-Ayqbgrw8GJvvYJ0vaz4w_02boY",
  "authDomain": "vitrine-digital-bwkpl.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "290789126716"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
