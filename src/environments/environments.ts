import { initializeApp } from "firebase/app";

export const environment = {
 production: false,
 firebaseConfig: {
 apiKey: "AIzaSyD9yKOuqVURq3VXcWLcZZawxE3Kby_wGWQ",
 authDomain: "buenosdias-6fb8c.firebaseapp.com",
 projectId: "buenosdias-6fb8c",
 storageBucket: "buenosdias-6fb8c.firebasestorage.app",
 messagingSenderId: "839311193137",
 appId: "1:839311193137:web:b8d102aea4bd10d05f9110"
 }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);