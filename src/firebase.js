// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGEF-SJlkylTslEuF_4MxEJSFctHblJ2g",
  authDomain: "hartfield-mission.firebaseapp.com",
  projectId: "hartfield-mission",
  storageBucket: "hartfield-mission.appspot.com",
  messagingSenderId: "13300986119",
  appId: "1:13300986119:web:6937dbb087f0f5458055a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
