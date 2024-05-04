import { useState } from 'react'; // Importa la función useState desde React
import backgroundImage from './assets/Images/Fondo.png'; // Importa la imagen de fondo
import './App.css'; // Importa los estilos CSS
import { FirstComponent } from './assets/Components/FirstComponent'; // Importa el primer componente
import { GameComponent } from './assets/Components/GameComponent'; // Importa el componente de juego
import { RanStatesComponent } from './assets/Components/RanStatesComponent'; // Importa el componente RanStates
import { MurcsComponent } from './assets/Components/MurcsComponent'; // Importa el componente Murcs
import { TextCropopoly } from './assets/Components/TextCropopoly'; // Importa el componente TextCropopoly
import { DisplayFotos } from './assets/Components/DisplayFotos'; // Importa el componente DisplayFotos
import { GraciasPorJugar } from './assets/Components/GraciasPorJugar'; // Importa el componente GraciasPorJugar
import { PruebaComments } from './assets/Components/PruebaComments'; // Importa el componente PruebaComments
import { TutorialComponent } from './assets/Components/TutorialComponent'; // Importa el componente TutorialComponent
import { TrailerComponent } from './assets/Components/TrailerComponent'; // Importa el componente TrailerComponent

// Define la función Pagina
function Pagina() {
  // Estilo para el fondo de la página
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`, // Fondo de la imagen importada
    backgroundSize: 'cover', // Esto hará que la imagen cubra todo el elemento
    backgroundRepeat: 'no-repeat', // Esto evitará que la imagen se repita
  };

  // Retorna el contenido de la página
  return (
    <div className="w-full h-full" style={appStyle}> {/* Contenedor principal con estilo de fondo */}
      <header className="App-header w-full">
        {/* Renderiza los diferentes componentes */}
        <FirstComponent className="mb-8" /> {/* Primer componente */}
        <GameComponent className="mb-8" /> {/* Componente de juego */}
        <RanStatesComponent className="mb-8" /> {/* Componente RanStates */}
        <MurcsComponent className="mb-8" /> {/* Componente Murcs */}
        <TutorialComponent className="mb-8"/> {/* Componente de tutorial */}
        <TrailerComponent className="mb-8"/> {/* Componente de trailer */}
        <TextCropopoly className="mb-8" /> {/* Componente TextCropopoly */}
        <DisplayFotos className="mb-8" /> {/* Componente DisplayFotos */}
        <GraciasPorJugar className="mb-8" /> {/* Componente GraciasPorJugar */}
        <PruebaComments className="mb-8" /> {/* Componente PruebaComments */}
      </header>
    </div>
  );
}

export default Pagina; // Exporta la función Pagina como componente principal
