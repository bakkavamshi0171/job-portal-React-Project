import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

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


// Configuration for the first Firebase app
const firebaseConfig1 = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://jobseeker-application-default-rtdb.firebaseio.com", // First database URL
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const app1 = initializeApp(firebaseConfig1, "app1");


const db = getDatabase(app);
const db1 = getDatabase(app1);

const storage = getStorage(app);

export {app, db, storage, app1, db1}
