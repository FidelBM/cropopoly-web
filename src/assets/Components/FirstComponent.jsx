/*
Autor:            Mariana Balderrábano
Modificado por:   Arturo Barrios

El código define el componente que despliega los logos de Cropopoly y de Verqor en 
la página principal
*/

// Importa React 
import React from 'react'
// Importa imágenes de logos de Verqor y Cropopoly
import logoVer from '../Images/logoVer.png'
import Cropopoly from '../Images/Cropopoly.png'

// El componente se separa en dos partes, para insertar los dos logos
export const FirstComponent = () => {
  return (
    <React.Fragment>
        <section>
            <div className = "App-Separated-Container flex flex-row items-center">
                <div className='App-Separated-Container'>
                <img src= {Cropopoly}  alt="Cropopoly" className='App-small-image'></img>
                </div>

                <div className='App-Separated-Container'>
                <img src= {logoVer}  alt="logoVer" className='App-reactive-image'></img>
                </div>
            </div>
        </section>
    </React.Fragment>
  )
}
