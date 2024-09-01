// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4SRyReITHm-1h3Y9z9vu97e9kvKA_96Q",
  authDomain: "react-tutorial-5634d.firebaseapp.com",
  projectId: "react-tutorial-5634d",
  storageBucket: "react-tutorial-5634d.appspot.com",
  messagingSenderId: "1071714310731",
  appId: "1:1071714310731:web:dcbf077deee76fd1508bce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;