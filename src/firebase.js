import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsEmHrYBw_YBtopEP--gnUWdSwGb_xUnM",
    authDomain: "vdportfolio-fad00.firebaseapp.com",
    projectId: "vdportfolio-fad00",
    storageBucket: "vdportfolio-fad00.firebasestorage.app",
    messagingSenderId: "1075533113838",
    appId: "1:1075533113838:web:f20f16eecfa09b060a46ff",
    measurementId: "G-GPM2Y1XDRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (prevent crashes in Brave/ad-blockers)
let analytics = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch((err) => {
    console.warn("Firebase Analytics is not supported or was blocked:", err);
});

// Initialize Services
// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
