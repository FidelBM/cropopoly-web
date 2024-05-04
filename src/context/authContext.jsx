/*
Autor:            Fidel Bonilla

El código es el uso de Autenticador de firebase
*/
import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config"; // Importa la configuración e instancia de autenticación de Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // Importa los métodos de autenticación de Firebase

// Crea el contexto de autenticación
export const authContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creando el contexto de autenticación");
  }
  return context;
};

// Componente proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(""); // Estado para almacenar el usuario autenticado
  
  // Efecto para escuchar cambios en el estado de autenticación
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario autenticado");
        setUser(""); // Establece el estado de usuario como vacío si no hay usuario autenticado
      } else {
        setUser(currentUser); // Establece el estado de usuario como el usuario actual si está autenticado
      }
    });
    return () => subscribed(); // Desuscribe onAuthStateChanged cuando el componente se desmonta
  }, []);

  // Función para registrar un nuevo usuario con correo electrónico y contraseña
  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };
 
  // Función para iniciar sesión con correo electrónico y contraseña
  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };
 
  // Función para iniciar sesión con Google
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  // Función para cerrar sesión
  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };

  // Proporciona el contexto de autenticación con las funciones de autenticación y el estado de usuario
  return (
    <authContext.Provider 
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
