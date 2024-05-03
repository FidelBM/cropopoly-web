import React, { useState, useEffect } from "react";
import "../App.css";
import { AuthProvider, useAuth } from "../context/authContext";
import { Link, useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faHeart, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import imagen from '../assets/Images/NuevoFondo.png';


function Registro() {
  const auth = useAuth();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const history = useNavigate();
  
    const handleGoogle = async (e) => {
      e.preventDefault();
      const googleUser = await auth.loginWithGoogle();
      const googleIdToken = googleUser.getAuthResponse().id_token;

      // Make a request to the Google Firebase Authentication API to get the user's name
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleIdToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user information from Google Firebase.");
      }

      const userData = await response.json();
      const userName = userData.name;

    };

    function generateGameId() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let gameId = '';
      for (let i = 0; i < 4; i++) {
        gameId += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return gameId;
    }
    


    const handleRegister = (e) => {
      e.preventDefault();
      if (!nombre || !apellido || !estado || !genero || !fechaNacimiento || !emailRegister || !passwordRegister) {
        setError("Por favor completa todos los campos.");
        return;
      }else{
      auth.register(emailRegister, passwordRegister)
        .then(async () => {
          try {
            
            
            const gameId = generateGameId();
            const response = await fetch("https://cropopoly-server-production.up.railway.app/jugadores", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                nombre,
                apellido,
                fechaNacimiento,
                genero,
                estado,
                email: emailRegister,
              })
            });
            const resultado = await fetch("https://cropopoly-server-production.up.railway.app/result", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: emailRegister,
              })
            });
            window.location.href = 'https://cropopoly-game-production.up.railway.app/';

    
            if (!response.ok) {
              throw new Error("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
            }
    
          } catch (error) {
            console.error("Error al registrar en el servidor:", error);
            setError("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
          }
    
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
          setError("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
        });
      }
    };
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }



  return (
      <div className="Background">


      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-tl-lg rounded-bl-lg p-4">

      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>

      </div>
      <div className="my-14">
        <p className="text-center relative text-gray-500 bg-gray-100 before:max-w-[50px] md:before:max-w-[120px] before:w-full before:-left-[60px] md:before:-left-[140px] before:h-[1px] before:bg-current before:absolute before:top-[50%] after:max-w-[50px] md:after:max-w-[120px] after:w-full after:h-[1px] after:bg-current after:absolute after:top-[50%] after:-right-[60px] md:after:-right-[140px]">
          Ingresa con tu email para poder jugar
        </p>
      </div>
      <div className="w-full mb-8">
        <form>
          <div className="flex justify-center mb-6">
            <input
              type="text" 
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-6">
              <input
              type="text" 
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-6">
              <input
              type="date" 
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              placeholder="Fecha de Nacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="email"
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              placeholder="Correo electrónico"
              
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-6">
              <input
                onChange={(e) => setPasswordRegister(e.target.value)}
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
          <div className="flex justify-center mb-4">
              <select
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
              </select>
          </div>

          <div className="flex justify-center mb-4">
              <select
              className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Tipo de usuario</option>
              <option value="Hombre">Cliente</option>
              <option value="Mujer">Fabricante de agroinsumos</option>
              <option value="Otro">Distribuidor de agroinsumos</option>
              <option value="Otro">Proveedor de seguros</option>
              <option value="Otro">Financieras</option>
              <option value="Otro">Empresa CPG</option>
              <option value="Otro">Acopilador</option>
              <option value="Otro">Inversionista</option>
              <option value="Otro">Público general</option>

              </select>
          </div>
            <div className="flex justify-center mb-4">
              <select className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}>
                <option value="someOption">Estado</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="México">México</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
          </div>

          <div className="w-full max-w-md mx-auto">
            <button
              type="submit"
              className="w-full bg-gray-200 py-2 px-4 rounded-lg text-gray-900 hover:bg-gray-300 transition-colors"
              onClick={(e) => handleRegister(e)}
            >
              Registrar
            </button>
            {error && <p className="text-red-500 text-center m-4">{error}</p>}
          </div>
        </form>
      </div>
      <div>
        
      </div>
    </div>
    <div className="hidden lg:flex items-center justify-center border-t border-r border-b rounded-tr-lg rounded-br-lg">
    <img src={imagen} alt="Descripción de la imagen" className="h-full object-cover" style={{ objectPosition: 'right' }} />
    </div>
  </div>
    </div>
    
  );
}

export default Registro;
