/*
Autor:            Fidel Bonilla 

El código 
*/
import React, { useState } from "react"; // Importa React y useState
import "../App.css"; // Importa estilos CSS
import { AuthProvider, useAuth } from "../context/authContext"; // Importa AuthProvider y useAuth del contexto de autenticación
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate de react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faEye, faEyeSlash, faHeart, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Importa iconos de FontAwesome
import imagen from '../assets/Images/NuevoFondo.png'; // Importa una imagen

// Componente Registro
function Registro() {
  const auth = useAuth(); // Usa el contexto de autenticación
  const [nombre, setNombre] = useState(""); // Estado para el nombre
  const [apellido, setApellido] = useState(""); // Estado para el apellido
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Estado para la fecha de nacimiento
  const [genero, setGenero] = useState(""); // Estado para el género
  const [estado, setEstado] = useState(""); // Estado para el estado
  const [emailRegister, setEmailRegister] = useState(""); // Estado para el email de registro
  const [passwordRegister, setPasswordRegister] = useState(""); // Estado para la contraseña de registro
  const [error, setError] = useState(null); // Estado para errores
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  
  const history = useNavigate(); // Navegación
  
  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    // Valida que todos los campos estén completos
    if (!nombre || !apellido || !estado || !genero || !fechaNacimiento || !emailRegister || !passwordRegister) {
      setError("Por favor completa todos los campos.");
      return;
    } else {
      // Registra al usuario con el email y la contraseña
      auth.register(emailRegister, passwordRegister)
        .then(async () => {
          try {
            // Genera un ID de juego aleatorio
            const gameId = generateGameId();
            // Realiza una solicitud para registrar al usuario en el servidor
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
            // Redirige al usuario a la página del juego
            window.location.href = 'https://cropopoly-game-production.up.railway.app/';
            // Maneja errores si la respuesta no es exitosa
            if (!response.ok) {
              throw new Error("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
            }
          } catch (error) {
            console.error("Error al registrar en el servidor:", error);
            setError("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
          }
        })
        // Maneja errores si hay algún problema con el registro
        .catch((error) => {
          console.error("Error al registrar:", error);
          setError("Hubo un problema al registrar. Por favor, inténtelo de nuevo.");
        });
    }
  };
  
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para generar un ID de juego aleatorio
  function generateGameId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let gameId = '';
    for (let i = 0; i < 4; i++) {
      gameId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return gameId;
  }

  // Renderiza el formulario de registro
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
              {/* Selecciona el género */}
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
              {/* Selecciona el tipo de usuario */}
              <div className="flex justify-center mb-4">
                <select
                  className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Tipo de usuario</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Fabricante de agroinsumos">Fabricante de agroinsumos</option>
                  <option value="Distribuidor de agroinsumos">Distribuidor de agroinsumos</option>
                  <option value="Proveedor de seguros">Proveedor de seguros</option>
                  <option value="Financieras">Financieras</option>
                  <option value="Empresa CPG">Empresa CPG</option>
                  <option value="Acopilador">Acopilador</option>
                  <option value="Inversionista">Inversionista</option>
                  <option value="Público general">Público general</option>
                </select>
              </div>
              {/* Selecciona el estado */}
              <div className="flex justify-center mb-4">
                <select className="w-full max-w-md py-2 px-4 rounded-lg outline-none"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}>
                  <option value="someOption">Estado</option>
                  <option value="Aguascalientes">Aguascalientes</option>
                  <option value="Baja California">Baja California</option>
                  {/* Resto de los estados... */}
                </select>
              </div>
              {/* Botón de registro */}
              <div className="w-full max-w-md mx-auto">
                <button
                  type="submit"
                  className="w-full bg-gray-200 py-2 px-4 rounded-lg text-gray-900 hover:bg-gray-300 transition-colors"
                  onClick={(e) => handleRegister(e)}
                >
                  Registrar
                </button>
                {/* Muestra el error si existe */}
                {error && <p className="text-red-500 text-center m-4">{error}</p>}
              </div>
            </form>
          </div>
        </div>
        {/* Imagen */}
        <div className="hidden lg:flex items-center justify-center border-t border-r border-b rounded-tr-lg rounded-br-lg">
          <img src={imagen} alt="Descripción de la imagen" className="h-full object-cover" style={{ objectPosition: 'right' }} />
        </div>
      </div>
    </div>
  );
}

export default Registro; // Exporta el componente Registro
