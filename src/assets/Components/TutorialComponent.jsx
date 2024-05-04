/*
Autor:            Mariana Balderrábano
Modificado por:   Lucio Reyes 
                  Arturo Barrios

El código es para definir el componente con El tutorial del juego
*/

// Importa React y el reproductor de video
import React from 'react';
import ReactPlayer from 'react-player';

// Importa video del tutorial
import video from '../videos/tutorial.mp4';

// Inserta el video tutorial en el componente y pone un encabezado de Tutorial
export const TutorialComponent = () => {
  return (
    <div className='App-Basic-Color'>
      <h1>Tutorial</h1>
      <ReactPlayer
        url={video}
        className="w-full md:w-1/2"
        width='100%' 
        height='100%' 
        controls 
      />
    </div>
  );
};