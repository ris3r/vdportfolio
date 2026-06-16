import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

// Initialize Services
// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
