import { AuthProvider } from "./context/authContext";
import Game from "./page/Game";
import Registro from "./page/Registro";
import Login2 from "./page/Login2";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Ranking from "./page/pruebas";
import Pagina from "./pagina";
import Dashboard from "./page/Dashboard";

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/Registro" element={<AuthProvider><Registro /></AuthProvider> } />
          <Route path="/game" element={<AuthProvider><Game /></AuthProvider> } />
          <Route path="/login" element={<AuthProvider><Login2 /></AuthProvider> } />
          <Route path="/dashboard" element={<AuthProvider><Dashboard /></AuthProvider> } />
          
          <Route path="/ranking" element={<AuthProvider><Ranking /></AuthProvider> } />
          <Route path="/" element={<AuthProvider><Pagina /></AuthProvider> } />
        </Routes>
    </BrowserRouter>


  );
}

export default App;