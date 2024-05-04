/*
Autor:            Mariana Balderrábano
Modificado por:   Estefanía Rico
                  Lucio Reyes

El código es para definir el componente de Murcs y su historia
*/

//Importa React y useRef
import React, { useEffect, useRef } from 'react';

//Importa la imagen de Murcs
import Muuurcs from '../Images/Murcs.png'

//Divide el componente en dos partes, para insertar la imagen y la historia de Murcs
export const MurcsComponent = () => {
  //Referencias para adaptar altura de componentes
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

  return (
    <React.Fragment>
        <section className="">
            <div className = "App-Separated-Container flex flex-col md:flex-row"  >
                <div className='App-half-light w-full md:w-1/2' ref={leftRef} style={{paddingTop:"10px" }}>
                  <img src= {Muuurcs}  alt="Murcs" className='App-reactive-image'></img>

                </div>

                <div className='App-half-light w-full md:w-1/2' ref={rightRef} style={{paddingTop:"10px" }}>
                <p className = "App-basic-font">
                Murcs finalmente logró cumplir su sueño: con gran esfuerzo y sacrificio, 
                invirtió todos sus ahorros para convertirse en el agricultor líder de la 
                región. Sin embargo, un devastador desastre natural lo golpeó inesperadamente, 
                arrasando con todo lo que había construido, ya que lamentablemente no contaba 
                con un seguro agrícola que lo respaldara. Ahora, en medio de la desesperación, 
                Murcs se encuentra en busca de ayuda para poder recuperarse y reconstruir su vida. 
                ¿Te unirás a él en esta lucha por volver a empezar?
                </p>
                
                </div>
            </div>
        </section>
    </React.Fragment>
  )
}