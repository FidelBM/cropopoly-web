import { AuthProvider } from "./context/authContext"; // Importa el proveedor de autenticación
import Game from "./page/Game"; // Importa la página Game
import Registro from "./page/Registro"; // Importa la página Registro
import Login2 from "./page/Login2"; // Importa la página Login2
import { useState } from "react"; // Importa la función useState de React
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"; // Importa componentes de enrutamiento de React Router DOM
import Ranking from "./page/pruebas"; // Importa la página Ranking
import Pagina from "./pagina"; // Importa la página Pagina
import Dashboard from "./page/Dashboard"; // Importa la página Dashboard

function App() {
  
  return (
    <BrowserRouter> {/* Envuelve la aplicación con el componente BrowserRouter */}
        <Routes> {/* Define las rutas de la aplicación */}
          {/* Rutas protegidas por el proveedor de autenticación */}
          <Route path="/Registro" element={<AuthProvider><Registro /></AuthProvider> } /> {/* Página de Registro */}
          <Route path="/game" element={<AuthProvider><Game /></AuthProvider> } /> {/* Página de Game */}
          <Route path="/login" element={<AuthProvider><Login2 /></AuthProvider> } /> {/* Página de Login */}
          <Route path="/dashboard" element={<AuthProvider><Dashboard /></AuthProvider> } /> {/* Página de Dashboard */}
          
          <Route path="/ranking" element={<AuthProvider><Ranking /></AuthProvider> } /> {/* Página de Ranking */}
          <Route path="/" element={<AuthProvider><Pagina /></AuthProvider> } /> {/* Página principal */}
        </Routes>
    </BrowserRouter>
  );
}

export default App; // Exporta la función App como componente principal
