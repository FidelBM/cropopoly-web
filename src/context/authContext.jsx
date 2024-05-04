import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config"; // Import Firebase authentication configuration and instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // Import Firebase authentication functions

// Create authentication context
export const authContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(""); // State to hold the authenticated user
  
  // Effect to listen for authentication state changes
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser(""); // Set user state to empty if no user is authenticated
      } else {
        setUser(currentUser); // Set user state to current user if authenticated
      }
    });
    return () => subscribed(); // Unsubscribe from onAuthStateChanged when component unmounts
  }, []);

  // Function to register a new user with email and password
  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };
 
  // Function to login with email and password
  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };
 
  // Function to login with Google
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  // Function to logout
  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };

  // Provide the authentication context with the authentication functions and user state
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
