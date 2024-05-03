import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";


const LineChart = () => {
  const [gameData, setGameData] = useState(null);
  const [ageFrequencies, setAgeFrequencies] = useState([]);

  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (gameData) {
      const calculateAge = (birthday) => {
        const ageDifferenceMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifferenceMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      };

      const frequencies = {};
      gameData.forEach((player) => {
        const age = calculateAge(player.fechaNacimiento);
        if (age in frequencies) {
          frequencies[age]++;
        } else {
          frequencies[age] = 1;
        }
      });

      // Convert frequencies object to array of objects for Nivo chart
      const formattedData = Object.keys(frequencies).map((age) => ({
        x: parseInt(age), // Age
        y: frequencies[age], // Frequency
      }));

      setAgeFrequencies(formattedData);
    }
  }, [gameData]);

  if (!gameData) {
    return <div>Loading...</div>;
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

export default LineChart;

