import { useState, useEffect, Fragment, useContext } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Link } from "react-router-dom";

import { authContext } from "../context/authContext";

function Game() {
  
  const { user, logout } = useContext(authContext); // Obtén logout de authContext
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`https://cropopoly-server-production.up.railway.app/jugadores?email=${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setUserData(data[0]);
          }
        })
        .catch(error => console.error(error));
    }
  }, [user]);

  

  console.log(user.email)

  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const { unityProvider } = useUnityContext({
    loaderUrl: "./src/page/WebGL/Build/WebGL.loader.js",
    dataUrl: "./src/page/WebGL/Build/WebGL.data",
    frameworkUrl: "./src/page/WebGL/Build/WebGL.framework.js",
    codeUrl: "./src/page/WebGL/Build/WebGL.wasm",
  });

  const handleLogout = () => {
    logout(); // Llama a la función de logout
    window.location.reload();
  }

  return (
    <div>

{userData ? (

  <div> 

<div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Unity unityProvider={unityProvider} style={{ width: '1250px', height: '720px', transform: 'scale(1.0)' }} />
    </div>

    

    <button 
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded bg-center w-screen"
  onClick={handleLogout}
>
  Logout
</button>
      </div>

      
      
      

    



) : (

  <div className="flex flex-col justify-center items-center h-full">
    <h2 className="text-3xl font-bold mb-4 text-gray-900">
      Por favor,{" "}
      <Link to="/" className="text-blue-500 hover:text-blue-700 transition-colors">
        inicia sesión
      </Link>{" "}
      o{" "}
      <Link to="/Registro" className="text-blue-500 hover:text-blue-700 transition-colors">
        regístrate
      </Link>
      .
    </h2>
  </div>


  
)}


    </div>
    
  );
}

export default Game;