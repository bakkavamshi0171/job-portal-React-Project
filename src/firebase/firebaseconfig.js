import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhetpS5zVQEj1ZlqWpGrcc0ooxUQD6MGM",
  authDomain: "job-portal-fdc41.firebaseapp.com",
  databaseURL: "https://job-portal-fdc41-default-rtdb.firebaseio.com/",
  projectId: "job-portal-fdc41",
  storageBucket: "job-portal-fdc41.firebasestorage.app",
  messagingSenderId: "81516958380",
  appId: "1:81516958380:web:ab7438163f89271e718509",
  measurementId: "G-3KJNF2ZGBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage}
