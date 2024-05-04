// Autor:    Fidel Bonilla
import { useState, useEffect, Fragment, useContext } from 'react'; // Importa useState, useEffect, Fragment y useContext desde React
import { Unity, useUnityContext } from "react-unity-webgl"; // Importa Unity y useUnityContext desde react-unity-webgl
import { Link } from "react-router-dom"; // Importa Link desde React Router DOM

import { authContext } from "../context/authContext"; // Importa el contexto de autenticación

function Game() {
  
  const { user, logout } = useContext(authContext); // Obtén user y logout del contexto de autenticación
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    if (user) { // Verifica si hay un usuario autenticado
      fetch(`https://cropopoly-server-production.up.railway.app/jugadores?email=${user.email}`) // Realiza una solicitud HTTP para obtener los datos del usuario
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setUserData(data[0]); // Almacena los datos del usuario en el estado
          }
        })
        .catch(error => console.error(error));
    }
  }, [user]);

  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight }); // Estado para almacenar el tamaño del contenedor
  const { unityProvider } = useUnityContext({ // Obtiene el proveedor de Unity
    loaderUrl: "./src/page/WebGL/Build/WebGL.loader.js", // URL del cargador
    dataUrl: "./src/page/WebGL/Build/WebGL.data", // URL de los datos
    frameworkUrl: "./src/page/WebGL/Build/WebGL.framework.js", // URL del framework
    codeUrl: "./src/page/WebGL/Build/WebGL.wasm", // URL del código
  });

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    window.location.reload(); // Recarga la página después de cerrar sesión
  }

  return (
    <div>

      {userData ? ( // Si hay datos del usuario, muestra el juego
        <div> 
          <div style={{ 
            width: '100vw', 
            height: '100vh', 
            overflow: 'hidden', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <Unity unityProvider={unityProvider} style={{ width: '1250px', height: '720px', transform: 'scale(1.0)' }} /> {/* Muestra el juego Unity WebGL */}
          </div>

          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded bg-center w-screen" // Estilo del botón de logout
            onClick={handleLogout} // Función para manejar el evento click en el botón de logout
          >
            Logout
          </button>
        </div>
      ) : ( // Si no hay datos del usuario, muestra un mensaje para iniciar sesión o registrarse
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Por favor,{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-700 transition-colors"> {/* Enlace para iniciar sesión */}
              inicia sesión
            </Link>{" "}
            o{" "}
            <Link to="/Registro" className="text-blue-500 hover:text-blue-700 transition-colors"> {/* Enlace para registrarse */}
              regístrate
            </Link>
            .
          </h2>
        </div>
      )}

    </div>
  );
}

export default Game; // Exporta el componente Game
