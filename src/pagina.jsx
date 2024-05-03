import { useState } from 'react'
import backgroundImage from './assets/Images/Fondo.png'; // Asegúrate de reemplazar esto con la ruta a tu imagen

import './App.css'
import {FirstComponent} from './assets/Components/FirstComponent';
import { GameComponent } from './assets/Components/GameComponent';  
import { RanStatesComponent } from './assets/Components/RanStatesComponent';
import {MurcsComponent} from './assets/Components/MurcsComponent';
import {TextCropopoly} from './assets/Components/TextCropopoly';
import {DisplayFotos} from './assets/Components/DisplayFotos';
import {GraciasPorJugar} from './assets/Components/GraciasPorJugar';
import {PruebaComments} from './assets/Components/PruebaComments';
import { TutorialComponent } from './assets/Components/TutorialComponent';
import { TrailerComponent } from './assets/Components/TrailerComponent';


function Pagina() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Esto hará que la imagen cubra todo el elemento
    backgroundRepeat: 'no-repeat', // Esto evitará que la imagen se repita
  };
  

  return (
    <div className="w-full h-full" style={appStyle}>
      <header className="App-header w-full">
        <FirstComponent className="mb-8" />
        <GameComponent className="mb-8" />
        <RanStatesComponent className="mb-8" />
        <MurcsComponent className="mb-8" />
        <TutorialComponent className="mb-8"/>
        <TrailerComponent className="mb-8"/>
        <TextCropopoly className="mb-8" />
        <DisplayFotos className="mb-8" />
        <GraciasPorJugar className="mb-8" />
        <PruebaComments className="mb-8" />
      </header>
    </div>
  )
}

export default Pagina