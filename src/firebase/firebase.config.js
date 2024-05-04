// Autor:    Fidel Bonilla

// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Configuración de tu aplicación Firebase
// Para Firebase JS SDK v7.20.0 y posterior, measurementId es opcional
const firebaseConfig = {
  apiKey: "AIzaSyCBmdD6nsYlkLgeKEGvIXAwkYY2NhypYgs",
  authDomain: "cropopoly-39788.firebaseapp.com",
  projectId: "cropopoly-39788",
  storageBucket: "cropopoly-39788.appspot.com",
  messagingSenderId: "950765925766",
  appId: "1:950765925766:web:742429da5abdf2c7f8e807",
  measurementId: "G-RF3EH4LX5N"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
