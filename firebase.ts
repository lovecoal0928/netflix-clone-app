// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb6nOBD2CP_0M0kECIVdk2IWCd23QxHbs",
  authDomain: "netflix-clone-app-e791e.firebaseapp.com",
  projectId: "netflix-clone-app-e791e",
  storageBucket: "netflix-clone-app-e791e.appspot.com",
  messagingSenderId: "951836437491",
  appId: "1:951836437491:web:3233fb05437c234b734086"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }