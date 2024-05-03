import React, { useState } from "react";
import "../App.css";
import { AuthProvider, useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHeart, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import imagen from '../assets/Images/Fondo.png';

function Login2() {
  const auth = useAuth();
  const history = useNavigate();
  const { displayName } = auth.user;
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };
  const handleLogin = async (e) => {
    console.log("email", email);
    console.log(password);
    e.preventDefault();
    try {
      await auth.login(email, password);

      const resultado = await fetch("https://cropopoly-server-production.up.railway.app/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      window.location.href = 'https://cropopoly-game-production.up.railway.app/';
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Error al iniciar sesión. Verifique su correo electrónico y contraseña."
      );
    }
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };
  const handleLogout = () => {
    auth.logout();
  };
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

export default Login2;
