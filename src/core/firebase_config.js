import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvgzEZQdK2ghskRYbDoUMPrIgz8-xsYYA",
    authDomain: "helpnest-54527.firebaseapp.com",
    projectId: "helpnest-54527",
    storageBucket: "helpnest-54527.firebasestorage.app",
    messagingSenderId: "1057167510210",
    appId: "1:1057167510210:web:2b8fdf01c83118f4e9095b",
    measurementId: "G-QMVE8SGP8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
