// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
/*
const firebaseConfig = {
    apiKey: "AIzaSyDUmk4fy0lLfSFq4RJQJyaaedVSgogtVaw",
    authDomain: "crypto-calculadora.firebaseapp.com",
    projectId: "crypto-calculadora",
    storageBucket: "crypto-calculadora.appspot.com",
    messagingSenderId: "234386462977",
    appId: "1:234386462977:web:35b83ec830d36b42662300"
  };*/

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore
const db = getFirestore(firebaseApp);

export { db };
