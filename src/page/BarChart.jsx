import React, { useEffect, useState } from "react";
import { ResponsiveWaffle } from "@nivo/waffle";

const PlayerGenderStatistics = () => {
  const [gameData, setGameData] = useState(null);
  const [genderFrequencies, setGenderFrequencies] = useState({});

  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => {
        setGameData(data);
        calculateGenderFrequencies(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const calculateGenderFrequencies = (data) => {
    const frequencies = {};

    data.forEach((player) => {
      const gender = player.genero || 'sin respuesta'; // Handle undefined gender
      if (gender in frequencies) {
        frequencies[gender]++;
      } else {
        frequencies[gender] = 1;
      }
    });

    setGenderFrequencies(frequencies);
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  
  const waffleData = Object.keys(genderFrequencies).map((gender) => ({
    id: gender,
    label: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: genderFrequencies[gender],
  }));

  return (
    <div style={{ height: "600px" }}>
      <h2>GRÁFICA DE WAFFLE 'GÉNERO DE JUGADORES'</h2>
      <ResponsiveWaffle
        data={waffleData}
        total={gameData.length} // Total number of players
        rows={15} // Number of rows in the waffle chart
        columns={20} 
        padding={3} 
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }} // Chart margins
        colors={{ scheme: "paired" }} 
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }} 
        animate={true} // Enable animations
        legends={[
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

export default PlayerGenderStatistics;
