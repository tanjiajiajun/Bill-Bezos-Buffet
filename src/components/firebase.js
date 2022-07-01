import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBEd3yG8hljm0SI4uWMy4F--yXOlf-AhPQ",
    authDomain: "bill-bezos-buffet.firebaseapp.com",
    projectId: "bill-bezos-buffet",
    storageBucket: "bill-bezos-buffet.appspot.com",
    messagingSenderId: "423543471715",
    appId: "1:423543471715:web:771af5d230bd4cafef4256",
    measurementId: "G-H432944NB2",
  };
  
  
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
// const app = initializeApp(firebaseConfig)  
const db = getFirestore(app)

const auth = firebase.auth() 


export { db, auth }

