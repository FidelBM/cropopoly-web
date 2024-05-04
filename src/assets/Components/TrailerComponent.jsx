/*
Autor:            Mariana Balderrábano
Modificado por:   Lucio Reyes 
                  Arturo Barrios

El código es para definir el componente con créditos y el video del trailer de Cropopoly
*/

// Importa React y el reproductor de video
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

// Importa el video del trailer
import video from "../videos/trailer.mp4";

export const TrailerComponent = () => {
  // Define referencias para ajustar altura de componentes
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  useEffect(() => {
    if (leftRef.current && rightRef.current) {
      const leftHeight = leftRef.current.clientHeight;
      const rightHeight = rightRef.current.clientHeight;
      const maxHeight = Math.max(leftHeight, rightHeight);

      leftRef.current.style.height = `${maxHeight}px`;
      rightRef.current.style.height = `${maxHeight}px`;
    }
  }, []);

  // Divide el componente en dos para insertar los créditos, el video de trailer y
  // pone un encabezado de Trailer
  return (
    <React.Fragment>
      <div className="App-Separated-Container flex flex-col md:flex-row">
        <div className="App-half-light w-full md:w-1/2" ref={leftRef}>
          <p className="App-basic-font">
            Cropopoly es un juego desarrollado especialmente para ti. La música
            fue creada especialmente para el juego por Arturo Barrios Mendoza.
            Todo el arte digital que está en el juego fue desarrollado por Fidel
            Alexander Bonilla Montalvo y Arturo Barrios Mendoza. El proyecto fue
            desarrollado por 5 ingenieros en sistemas computacionales, Alejandra
            Estefanía Rico González, Mariana Balderrábano Aguilar, Lucio Arturo
            Reyes Castillo, Arturo Barrios Mendoza, Fidel Alexander Bonilla
            Montalvo
          </p>
        </div>

        <div className="App-half-light w-full md:w-1/2" ref={rightRef}>
          <h3>Trailer</h3>
          <ReactPlayer url={video} width="100%" height="100%" controls />
        </div>
      </div>
    </React.Fragment>
  );
};
