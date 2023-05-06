import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEE-u90iYUe8P8EVa43cAnBbMl1zt_uOs",
    authDomain: "twitter-ad-30369.firebaseapp.com",
    projectId: "twitter-ad-30369",
    storageBucket: "twitter-ad-30369.appspot.com",
    messagingSenderId: "901452477314",
    appId: "1:901452477314:web:48613fbc1b9c9af0d5959b"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };

