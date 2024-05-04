/*
Autor:            Estefanía Rico

El código 
*/
import React, { useEffect, useState } from "react"; // Importa React, useEffect y useState desde React
import { ResponsiveWaffle } from "@nivo/waffle"; // Importa el componente ResponsiveWaffle de la librería @nivo/waffle

const PlayerGenderStatistics = () => {
  const [gameData, setGameData] = useState(null); // Estado para almacenar los datos del juego
  const [genderFrequencies, setGenderFrequencies] = useState({}); // Estado para almacenar las frecuencias de género

  useEffect(() => {
    // Efecto de lado para cargar los datos del juego cuando el componente se monta
    fetch("https://cropopoly-server-production.up.railway.app/jugadores")
      .then((response) => response.json())
      .then((data) => {
        setGameData(data);
        calculateGenderFrequencies(data); // Calcular las frecuencias de género cuando se cargan los datos
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const calculateGenderFrequencies = (data) => {
    // Función para calcular las frecuencias de género a partir de los datos de los jugadores
    const frequencies = {};

    data.forEach((player) => {
      const gender = player.genero || "sin respuesta"; // Manejar género no definido
      if (gender in frequencies) {
        frequencies[gender]++;
      } else {
        frequencies[gender] = 1;
      }
    });

    setGenderFrequencies(frequencies);
  };

  if (!gameData) {
    return <div>Loading...</div>; // Muestra un mensaje de carga si los datos aún no están disponibles
  }

  // Formatear datos para el gráfico de waffle
  const waffleData = Object.keys(genderFrequencies).map((gender) => ({
    id: gender,
    label: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: genderFrequencies[gender],
  }));

  // Renderizar el componente ResponsiveWaffle con los datos
  return (
    <div style={{ height: "600px" }}>
      <h2>GRÁFICA DE WAFFLE 'GÉNERO DE JUGADORES'</h2>
      <ResponsiveWaffle
        data={waffleData}
        total={gameData.length} // Número total de jugadores
        rows={15} // Número de filas en el gráfico de waffle
        columns={20} // Número de columnas en el gráfico de waffle
        padding={3} // Espaciado entre celdas
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }} // Márgenes del gráfico
        colors={{ scheme: "paired" }} // Esquema de colores
        borderColor={{ from: "color", modifiers: [["darker", 0.5]] }} // Color del borde
        animate={true} // Habilitar animaciones
        legends={[ // Leyenda del gráfico
          {
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: -50,
            translateY: -30,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemTextColor: "#000",
            itemOpacity: 1,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                  itemBackground: "#f7fafb",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PlayerGenderStatistics; // Exporta el componente PlayerGenderStatistics

