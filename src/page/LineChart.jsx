/*
Autor:            Estefanía Rico

El código 
*/
import React, { useEffect, useState } from "react"; // Importa React, useEffect y useState desde React
import { ResponsiveLine } from "@nivo/line"; // Importa ResponsiveLine desde la librería Nivo

const LineChart = () => {
  const [gameData, setGameData] = useState(null); // Estado para almacenar los datos del juego
  const [ageFrequencies, setAgeFrequencies] = useState([]); // Estado para almacenar las frecuencias de edad

  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores') // Realiza una solicitud HTTP para obtener los datos de los jugadores
      .then(response => response.json())
      .then(data => setGameData(data)) // Almacena los datos del juego en el estado
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (gameData) {
      const calculateAge = (birthday) => { // Función para calcular la edad a partir de la fecha de nacimiento
        const ageDifferenceMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifferenceMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      };

      const frequencies = {};
      gameData.forEach((player) => { // Calcula las frecuencias de edad
        const age = calculateAge(player.fechaNacimiento);
        if (age in frequencies) {
          frequencies[age]++;
        } else {
          frequencies[age] = 1;
        }
      });

      // Convierte el objeto de frecuencias en un array de objetos para el gráfico de Nivo
      const formattedData = Object.keys(frequencies).map((age) => ({
        x: parseInt(age), // Edad
        y: frequencies[age], // Frecuencia
      }));

      setAgeFrequencies(formattedData); // Almacena los datos de frecuencia de edad en el estado
    }
  }, [gameData]);

  if (!gameData) {
    return <div>Loading...</div>; // Muestra un mensaje de carga si los datos del juego aún no se han cargado
  }

  return (
    <div style={{ height: "400px" }}>
      <h2>GRÁFICA DE LÍNEA 'EDADES'</h2>
      <ResponsiveLine
        data={[
          {
            id: "Age Frequencies",
            data: ageFrequencies,
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "linear", min: "auto", max: "auto" }}
        yScale={{ type: "linear", min: 0, max: "auto", stacked: false, reverse: false }}
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Edad",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Frequencias",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        lineWidth={3}
        enablePoints={true}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableGridX={false}
        enableGridY={true}
        enableArea={false}
        enableSlices="x"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        enablePointLabel={true}
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[{ match: "*", id: "lines" }]}
      />
    </div>
  );
};

export default LineChart; // Exporta el componente LineChart
