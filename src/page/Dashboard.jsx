import React, { useContext, useState, useEffect } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import BarChartJ from "./BarChartJ";
import PieChart from "./PieChart";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(authContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`https://cropopoly-server-production.up.railway.app/jugadores?email=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setUserData(data[0]);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div style={{ backgroundColor: "#FDF2DA" }} className="p-8">
      {userData ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Visualización de datos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gráficas para análisis de datos</h2>
                <PieChart />
              </div>
            </div>
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edades de los Jugadores</h2>
                <LineChart />
              </div>
            </div>
            <div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gráficas adicionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <BarChart />
                  </div>
                  <div>
                    <BarChartJ />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Por favor, <Link to="/">inicia sesión</Link> o <Link to="/Registro">regístrate</Link>.
          </h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;