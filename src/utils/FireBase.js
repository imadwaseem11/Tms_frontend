// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanagement-d3730.firebaseapp.com",
  projectId: "taskmanagement-d3730",
  storageBucket: "taskmanagement-d3730.appspot.com",
  messagingSenderId: "105388609746",
  appId: "1:105388609746:web:0653c18a51fa0c7aa59d0b",
  measurementId: "G-P1VRCS6GXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app object
export { app };
