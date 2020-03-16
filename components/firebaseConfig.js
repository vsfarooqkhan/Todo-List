
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR02XCsbncqozRd4UTwcqfeLouh0DnZI4",
    authDomain: "todolist-f6a5b.firebaseapp.com",
    databaseURL: "https://todolist-f6a5b.firebaseio.com",
    projectId: "todolist-f6a5b",
    storageBucket: "todolist-f6a5b.appspot.com",
    messagingSenderId: "897901111596",
    appId: "1:897901111596:web:b71d89d9f2f1ab01e1e489",
    measurementId: "G-YJNXQZKNJX"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
//const baseDb = myFirebase.firestore();
//export const db = baseDb;