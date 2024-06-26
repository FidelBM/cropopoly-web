/*
Autor:            Estefanía Rico

El código es una grafica de pastel para mostrar los paises en lo que juegan las perosnas
*/
import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import {
    LINK
} from '../../page/config.js';

// Función para calcular la cantidad de jugadores por localidad
const calculateLocalityOccurrences = (players) => {
  const localityOccurrences = {};

  players.forEach(player => {
    const locality = player.estado || 'Unknown'; // Utiliza 'Unknown' si la localidad está ausente
    if (locality in localityOccurrences) {
      localityOccurrences[locality] += 1;
    } else {
      localityOccurrences[locality] = 1;
    }
  });

  return localityOccurrences;
};

// Componente del gráfico de pastel
const PieChart = () => {
  // Estado para almacenar los datos del juego
  const [gameData, setGameData] = useState(null);
  // Estado para almacenar la cantidad de jugadores por localidad
  const [localityOccurrences, setLocalityOccurrences] = useState(null);

  // Efecto para cargar los datos del juego desde la API
  useEffect(() => {
    fetch(`${LINK}/jugadores`)
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Efecto para calcular la cantidad de jugadores por localidad cuando los datos del juego cambian
  useEffect(() => {
    if (gameData) {
      const occurrences = calculateLocalityOccurrences(gameData);
      setLocalityOccurrences(occurrences);
    }
  }, [gameData]);

  // Renderiza el componente del gráfico de pastel
  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <p className="text-xl sm:text-xl md:text-1xl lg:text-1xl xl:text-2xl">Gráfica de Localidades México</p>
      {localityOccurrences && (
        <ResponsivePie
          // Configuración del gráfico de pastel
          data={Object.entries(localityOccurrences).map(([locality, count]) => ({
            id: locality,
            label: locality,
            value: count
          }))}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          colors={{ scheme: 'category10' }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          enableSliceLabels={true}
          sliceLabel="value"
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: 'center',
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle'
            }
          ]}
        />
      )}
    </div>
  );
};

export default PieChart;
