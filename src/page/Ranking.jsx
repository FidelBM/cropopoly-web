/*
Autor:            Fidel Bonilla 

El código muestra el Rankin de los jugadores tomando el cuenta las monedas de cada juego
*/
import React, { useEffect, useState } from "react"; // Importa React y los hooks necesarios
import Box from '@mui/material/Box'; // Importa el componente Box de Material-UI
import { DataGrid } from '@mui/x-data-grid'; // Importa el componente DataGrid de Material-UI
import {
    LINK
} from './config.js';

// Componente de Ranking
const Ranking = () => {
  const [gameData, setGameData] = useState(null); // Estado para los datos del juego
  const [topParticipants, setTopParticipants] = useState([]); // Estado para los mejores participantes

  // Efecto para cargar los datos del juego y calcular el ranking
  useEffect(() => {
    fetch(`${LINK}/jugadores`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          // Filtra y ordena los saldos de los participantes
          const balances = data.flatMap(item => 
            item.Juego ? item.Juego.map(juego => ({ balance: juego.balance, name: item.nombre })) : []
          );
          const filteredBalances = balances.filter(entry => entry.balance !== null && entry.balance !== 0);
          filteredBalances.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));

          // Toma los primeros 5 participantes
          const topFive = filteredBalances.slice(0, 5);
          setTopParticipants(topFive);
        }
        setGameData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Columnas para el DataGrid
  const columns = [
    { field: 'name', headerName: 'Nombre del Participante', width: 200 },
    { field: 'balance', headerName: 'Saldo', type: 'number', width: 150 }
  ];

  // Si no hay datos del juego, muestra un mensaje de carga
  if (!gameData) {
    return <div>Loading...</div>;
  }

  // Renderiza el ranking en un DataGrid si hay datos disponibles
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={topParticipants}
        columns={columns}
        pageSize={5} // Muestra solo 5 filas por página
        checkboxSelection={false} // Deshabilita la selección de filas
      />
    </Box>
  );
};

export default Ranking; // Exporta el componente Ranking
