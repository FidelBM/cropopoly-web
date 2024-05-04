/*
Autor:            Mariana Balderrábano
Modificado por:   Fidel Bonilla

El código define el componente de juego que despliega el login para posteriormente jugar
*/

//Importa React
import React from 'react'
//Importa Link de React Router DOM
import { Link } from "react-router-dom";
//Importa la imagen de fondo
import fondo from '../Images/fondoJuego.png';

//Inserta el mensaje de agradecimiento en el componente
export const GameComponent = () => {
  return (
    <div className="flex items-center justify-center px-8 md:px-10 lg:px-12">
        <Link to="/login" className="">
          <img src={fondo} alt="Juego" className="max-w-full h-auto object-cover" />
        </Link>
    </div>
  )
}