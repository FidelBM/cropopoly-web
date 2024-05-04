/*
Autor:            Fidel Bonilla 

El código 
*/
import React, { useEffect, useState } from "react"; // Importa React y los hooks necesarios
import { ResponsivePie } from "@nivo/pie"; // Importa el componente de gráfico de pastel de Nivo

// Función para calcular la ocurrencia de localidades
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

// Componente de gráfico de pastel
const PieChart = () => {
  const [gameData, setGameData] = useState(null); // Estado para los datos del juego
  const [localityOccurrences, setLocalityOccurrences] = useState(null); // Estado para las ocurrencias de localidades

  // Efecto para cargar los datos del juego
  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Efecto para calcular las ocurrencias de localidades cuando los datos del juego cambian
  useEffect(() => {
    if (gameData) {
      const occurrences = calculateLocalityOccurrences(gameData);
      setLocalityOccurrences(occurrences);
    }
  }, [gameData]);

  // Si no hay datos del juego, muestra un mensaje de carga
  if (!gameData) {
    return <div>Loading...</div>;
  }

  // Renderiza el gráfico de pastel si las ocurrencias de localidades están disponibles
  return (
    <div style={{ height: "400px" }}>
      <h2>GRÁFICA DE PASTEL LOCALIDADES</h2>
      {localityOccurrences && (
        <ResponsivePie
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

export default PieChart; // Exporta el componente PieChart
