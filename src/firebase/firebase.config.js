// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBmdD6nsYlkLgeKEGvIXAwkYY2NhypYgs",
  authDomain: "cropopoly-39788.firebaseapp.com",
  projectId: "cropopoly-39788",
  storageBucket: "cropopoly-39788.appspot.com",
  messagingSenderId: "950765925766",
  appId: "1:950765925766:web:742429da5abdf2c7f8e807",
  measurementId: "G-RF3EH4LX5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);