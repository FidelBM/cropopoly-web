/*
Autor:            Mariana Balderrábano
Modificado por:   Arturo Barrios

El código es para definir un componente con un mensaje de reto del juego
*/

//Importa React
import React from 'react'

//Inserta el mensaje en el componente
export const TextCropopoly = () => {
  return (
    <div className='App-Basic-Color'>
        <p className = "App-basic-font" >
            ¿Alguna vez te imaginaste cómo será la vida de una persona 
            en el sector agrícola? ¿Has pensado en los retos que esto conllevaría?
            <br></br>
            Con Cropopoly puedes experimentarlo, pero ¿Te atreves?
        </p>
    </div>
  );
};