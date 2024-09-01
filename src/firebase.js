import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDukU1s-TywFMEc8tIyqT1v7fcyP_Hvdkg",
  authDomain: "backend-test-cbc8c.firebaseapp.com",
  projectId: "backend-test-cbc8c",
  storageBucket: "backend-test-cbc8c.appspot.com",
  messagingSenderId: "695881769295",
  appId: "1:695881769295:web:fb3d0496ad5725a878653a",
  measurementId: "G-WB4S0KWQQ3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
