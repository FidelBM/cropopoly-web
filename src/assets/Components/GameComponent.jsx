import React from 'react'

import { Link } from "react-router-dom";
import fondo from '../Images/fondoJuego.png';

export const GameComponent = () => {
  return (
    <div className="flex items-center justify-center px-8 md:px-10 lg:px-12">
        <Link to="/login" className="">
          <img src={fondo} alt="Juego" className="max-w-full h-auto object-cover" />
        </Link>
    </div>
  )
}