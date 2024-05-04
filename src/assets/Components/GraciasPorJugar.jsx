/*
Autor:            Mariana Balderrábano

El código es para definir un mensaje de agradecimiento por jugar
*/

//Importa React
import React from 'react'

//Inserta el mensaje de agradecimiento en el componente
export const GraciasPorJugar = () => {
  return (
    <div className='App-Basic-Color'>
      <h1>¡Gracias por jugar!</h1>
        <p className = "App-basic-font" >
            Esperamos que el videojuego te haya ayudado a pasar un buen rato, 
            esperamos que lo disfrutes mucho. Te invitamos a dejarnos tus comentarios
            acerca del juego 
        </p>
    </div>
  );
};