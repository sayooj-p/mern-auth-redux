// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyCZGFoO1judxwb-vZEpVJnnAptPgKlwEAA",
  authDomain: "mern-auth-13d77.firebaseapp.com",
  projectId: "mern-auth-13d77",
  storageBucket: "mern-auth-13d77.firebasestorage.app",
  messagingSenderId: "1065184818911",
  appId: "1:1065184818911:web:9395a8ac82a348ecd15b6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);