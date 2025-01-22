// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2d76FDcJIx2cc993KF-qfaWhD39vrqHQ",
  authDomain: "adoptasidekick.firebaseapp.com",
  projectId: "adoptasidekick",
  storageBucket: "adoptasidekick.appspot.com", // Corrected storage bucket
  messagingSenderId: "933622311491",
  appId: "1:933622311491:web:329016fc1cb5441aa4c2f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // Explicitly pass the app instance
export const db = getFirestore(app);
export default app;
