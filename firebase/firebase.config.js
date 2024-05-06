// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCshdhqf-qjNzsH8ZSSR100P3YLUQ7CV6w",
  authDomain: "mechguideproject.firebaseapp.com",
  projectId: "mechguideproject",
  storageBucket: "mechguideproject.appspot.com",
  messagingSenderId: "995506409505",
  appId: "1:995506409505:web:df31e3e7b3b62507075360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db=getFirestore(app)
export {auth,db}