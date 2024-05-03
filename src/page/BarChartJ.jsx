import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
//TIPO DE FINANCIAMIENTO

const BarChartJ = () => {
  const [gameData, setGameData] = useState(null);
  const [financiamientoCounts, setFinanciamientoCounts] = useState({
    verqor: 0,
    tradicional: 0,
    informal: 0,
    otro: 0
  });

  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => {
        setGameData(data);
        calculateFinanciamientoCounts(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const calculateFinanciamientoCounts = (data) => {
    const counts = {
      verqor: 0,
      tradicional: 0,
      informal: 0,
      otro: 0
    };

    data.forEach(item => {
      if (item.Juego) {
        item.Juego.forEach(juego => {
          const tipoFinanciamiento = juego.tipoFinanciamiento ? juego.tipoFinanciamiento.toLowerCase() : null;

          if (tipoFinanciamiento === 'verqor') {
            counts.verqor++;
          } else if (tipoFinanciamiento === 'tradicional') {
            counts.tradicional++;
          } else if (tipoFinanciamiento === 'informal') {
            counts.informal++;
          } else {
            counts.otro++;
          }
        });
      }
    });

    setFinanciamientoCounts(counts);
  };

  return (
    <div style={{ height: "400px" }}>
      <h2>PROMEDIO DE FINANCIAMIENTO ELEGIDOS POR JUGADORES</h2>
      <ResponsivePie
        data={[
          { id: 'verqor', label: 'Verqor', value: financiamientoCounts.verqor },
          { id: 'tradicional', label: 'Tradicional', value: financiamientoCounts.tradicional },
          { id: 'informal', label: 'Informal', value: financiamientoCounts.informal },
          { id: 'otro', label: 'Otro', value: financiamientoCounts.otro }
        ]}
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
    </div>
  );
};

export default BarChartJ;
