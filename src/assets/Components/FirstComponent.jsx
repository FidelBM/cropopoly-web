import React from 'react'
import logoVer from '../Images/logoVer.png'
import Cropopoly from '../Images/Cropopoly.png'

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
