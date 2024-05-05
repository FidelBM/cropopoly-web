/*
Autor:            Fidel Bonilla 

El código es el forms de login para autenticar el ususario y revisar la base de datos
*/
import React, { useState } from "react"; // Importa React y useState desde React
import "../App.css"; // Importa los estilos CSS
import { AuthProvider, useAuth } from "../context/authContext"; // Importa AuthProvider y useAuth desde el contexto de autenticación
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate desde React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon desde Font Awesome
import { faEye, faEyeSlash, faHeart, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Importa iconos de Font Awesome
import imagen from '../assets/Images/Fondo.png'; // Importa la imagen de fondo
import {
    LINK,
    LINK_JUEGO
} from './config.js';

function Login2() {
  const auth = useAuth(); // Obtiene la autenticación del contexto
  const history = useNavigate(); // Obtiene la historia de navegación
  const { displayName } = auth.user; // Obtiene el nombre de usuario de la autenticación
  const [emailRegister, setEmailRegister] = useState(""); // Estado para el correo electrónico de registro
  const [passwordRegister, setPasswordRegister] = useState(""); // Estado para la contraseña de registro
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para el mensaje de error
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.login(email, password);

      // Realiza una solicitud para obtener los resultados del jugador y redirige al juego
      const resultado = await fetch(`${LINK}/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      window.location.href = LINK_JUEGO;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Error al iniciar sesión. Verifique su correo electrónico y contraseña."
      );
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    auth.logout();
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg rounded-bl-lg p-4">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>
        </div>
        <div className="my-14">
          <p className="text-center relative text-gray-500 bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
            Inicia sesión con tu email para poder jugar
          </p>
        </div>
        <div className="w-full mb-8">
          <form>
            <div className="flex justify-center mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="flex justify-center mb-6">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} // Cambia el tipo según el estado showPassword
                className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none ml-2"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="w-full max-w-md mx-auto">
              <button
                onClick={(e) => handleLogin(e)}
                type="submit"
                className="w-full bg-gray-200 py-2 px-4 rounded-lg text-gray-900 hover:bg-gray-300 transition-colors"
              >
                Iniciar sesión
              </button>
              {error && (
                <p className="text-red-500 text-center m-4">{error}</p>
              )}
            </div>
          </form>
        </div>
        <div>
          <span className="text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link to="/Registro">Registrar</Link>
          </span>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center border-t border-r border-b rounded-tr-lg rounded-br-lg">
        <img src={imagen} alt="Descripción de la imagen" className="h-full object-cover" style={{ objectPosition: 'right' }} />
      </div>
    </div>
  );
}

export default Login2; // Exporta el componente Login2
