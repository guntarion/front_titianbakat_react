// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKmdWnN_q-ReTZPz5Rk-y2cD-nGvNPTTU",
    authDomain: "titian-bakat-japo-2024.firebaseapp.com",
    projectId: "titian-bakat-japo-2024",
    storageBucket: "titian-bakat-japo-2024.appspot.com",
    messagingSenderId: "916253017532",
    appId: "1:916253017532:web:81179ceaa72353a13417b9",
    measurementId: "G-BLDXMYRL40"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };