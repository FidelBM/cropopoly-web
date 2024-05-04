/*
Autor:            Mariana Balderrábano
Modificado por:   Lucio Reyes 

El código define el componente de carrete de fotos de la página principal
*/

// Importa React y los estilos del carrusel
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Importa las imágenes desplegadas en el carrusel
import cropopoly1 from '../Images/carrusel/1.png';
import cropopoly2 from '../Images/carrusel/2.png';
import cropopoly3 from '../Images/carrusel/3.png';
import cropopoly4 from '../Images/carrusel/4.png';
import cropopoly5 from '../Images/carrusel/5.png';
import cropopoly6 from '../Images/carrusel/6.png';

// Inserta imágenes en el carrusel y define que se pueda desplazar infinitamente
export const DisplayFotos = () => {
  return (
    <div className="">
      <Carousel infiniteLoop={true} showThumbs={false} className='App-Basic-Color'>
        <div>
          <img src={cropopoly1} alt="cropopoly1" className="w-full md:w-1/2"/>
        </div>
        <div>
          <img src={cropopoly2} alt="cropopoly2" className="w-full md:w-1/2"/>
        </div>
        <div>
          <img src={cropopoly3} alt="cropopoly3" className="w-full md:w-1/2"/>
        </div>
        <div>
          <img src={cropopoly4} alt="cropopoly4" className="w-full md:w-1/2"/>
        </div>
        <div>
          <img src={cropopoly5} alt="cropopoly5" className="w-full md:w-1/2"/>
        </div>
        <div>
          <img src={cropopoly6} alt="cropopoly6" className="w-full md:w-1/2"/>
        </div>
      </Carousel>
    </div>
  );
};