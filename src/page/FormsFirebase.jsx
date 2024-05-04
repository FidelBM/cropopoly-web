/*
Autor:            Fidel Bonilla 

El código 
*/

import React, { useState } from "react";
import "../App.css";
import { useAuth } from "../context/authContext";

function FormsFirebase() {
  const auth = useAuth();
  const { displayName } = auth.user; // Extrae el nombre de usuario de la autenticación

  // Hooks de estado para los campos de registro
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  // Hooks de estado para los campos de inicio de sesión
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Maneja el registro de un nuevo usuario
  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  // Maneja el inicio de sesión de un usuario existente
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(email, password);
  };

  // Maneja el inicio de sesión con Google
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    auth.logout();
  }

  return (
    <div className="App">
      {/* Muestra el nombre de usuario si está autenticado */}
      {displayName && <h5>welcome : {displayName}</h5>}
      
      {/* Formulario de registro */}
      <form className="form">
        <h3 className="title">Register</h3>
        <input
          onChange={(e) => setEmailRegister(e.target.value)}
          className="input"
          type="email"
        />
        <input
          onChange={(e) => setPasswordRegister(e.target.value)}
          className="input"
          type="password"
        />
        <button onClick={(e) => handleRegister(e)} className="button">
          submit
        </button>
      </form>

      {/* Formulario de inicio de sesión */}
      <form className="form">
        <h3 className="title">Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
        />
        <button onClick={(e) => handleLogin(e)} className="button">
          submit
        </button>
        <button onClick={(e) => handleGoogle(e)} className="button">
          Google
        </button>
      </form>

      {/* Botón para cerrar sesión */}
      <button onClick={() => handleLogout()} className="button">Logout</button>
    </div>
  );
}

export default FormsFirebase;
