/*
Autor:            Fidel Bonilla 

El código muestra el Ranking del jugador con un estilo personalizado
*/
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Ranking = () => {
  // State variables to store game data and top participants
  const [gameData, setGameData] = useState(null);
  const [topParticipants, setTopParticipants] = useState([]);

  useEffect(() => {
    // Fetch game data from the API endpoint when the component mounts
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => {
        if (data) {
          // Extract participant balances and names from the game data
          const balances = data.flatMap(item => 
            item.Juego ? item.Juego.map(juego => ({ id:juego.id,  balance: juego.balance, name: item.nombre})) : []
          );
          // Filter out entries with null or zero balances
          const filteredBalances = balances.filter(entry => entry.balance !== "null" && entry.balance !== "0");
          // Sort the filtered balances in descending order
          filteredBalances.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
          // Take the top 5 participants based on their balances
          const topFive = filteredBalances.slice(0, 4);
          // Update the state variable with the top participants
          setTopParticipants(topFive);
        }
        // Update the state variable with the game data
        setGameData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Define columns for the DataGrid component
  const columns = [
    { field: 'name', headerName: 'Participant Name', width: 200 },
    { field: 'balance', headerName: 'Balance', type: 'number', width: 150 }
  ];

  // Display a loading message while fetching data
  if (!gameData) {
    return <div>Loading...</div>;
  }

  // Render the DataGrid component with top participants data
  return (
    <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={topParticipants}
        columns={columns}
        pageSize={5} // Display only 5 rows per page
        checkboxSelection={false} // Disable row selection
        hideFooterPagination // Hide pagination
        hideFooterRowCount // Hide row count
      />
    </Box>
  );
};
export default Ranking;
