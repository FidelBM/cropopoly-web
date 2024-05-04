/*
Autor:            Estefanía Rico

El código 
*/
import React, { useContext, useState, useEffect } from "react"; // Importa React, useContext, useState y useEffect desde React
import LineChart from "./LineChart"; // Importa el componente LineChart
import BarChart from "./BarChart"; // Importa el componente BarChart
import BarChartJ from "./BarChartJ"; // Importa el componente BarChartJ
import PieChart from "./PieChart"; // Importa el componente PieChart
import { authContext } from "../context/authContext"; // Importa el contexto de autenticación
import { Link } from "react-router-dom"; // Importa el componente Link de React Router DOM

const Dashboard = () => {
  const { user, logout } = useContext(authContext); // Obtiene el usuario y la función de logout del contexto de autenticación
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    if (user) { // Verifica si hay un usuario autenticado
      fetch(`https://cropopoly-server-production.up.railway.app/jugadores?email=${user.email}`) // Realiza una solicitud HTTP para obtener los datos del usuario
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setUserData(data[0]); // Almacena los datos del usuario en el estado
          }
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto de autenticación
    window.location.reload(); // Recarga la página después de cerrar sesión
  };

  return (
    <div style={{ backgroundColor: "#FDF2DA" }} className="p-8"> {/* Estilo y clase CSS para el contenedor principal */}
      {userData ? ( // Si hay datos del usuario, muestra el contenido del dashboard
        <div>
          <h1 className="text-3xl font-bold mb-4">Visualización de datos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Grid para mostrar los gráficos */}
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gráficas para análisis de datos</h2>
                <PieChart /> {/* Muestra el componente PieChart */}
              </div>
            </div>
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edades de los Jugadores</h2>
                <LineChart /> {/* Muestra el componente LineChart */}
              </div>
            </div>
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gráficas adicionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid para las gráficas adicionales */}
                  <div>
                    <BarChart /> {/* Muestra el componente BarChart */}
                  </div>
                  <div>
                    <BarChartJ /> {/* Muestra el componente BarChartJ */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto" // Estilo del botón de logout
            onClick={handleLogout} // Función para manejar el evento click en el botón de logout
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Por favor, <Link to="/">inicia sesión</Link> o <Link to="/Registro">regístrate</Link>. {/* Mensaje para usuarios no autenticados */}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard; // Exporta el componente Dashboard
