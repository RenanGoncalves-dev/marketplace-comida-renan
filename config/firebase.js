import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKQt8D7yacQbIpNZMMiywp2LjKSeUzVBs",
  authDomain: "rennmarketplace-71fad.firebaseapp.com",
  projectId: "rennmarketplace-71fad",
  storageBucket: "rennmarketplace-71fad.firebasestorage.app",
  messagingSenderId: "855789162935",
  appId: "1:855789162935:web:c4c8071451820c24f45832",
  measurementId: "G-BSJWXHJ131"
};

// Inicializa checando se já existe uma instância ativa no Snack
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Uso simplificado do Auth para evitar conflitos com Webpack no Snack
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };