import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Ranking = () => {
  const [gameData, setGameData] = useState(null);
  const [topParticipants, setTopParticipants] = useState([]);

  useEffect(() => {
    fetch('https://cropopoly-server-production.up.railway.app/jugadores')
      .then(response => response.json())
      .then(data => {
        if (data) {

          const balances = data.flatMap(item => 
            item.Juego ? item.Juego.map(juego => ({ id:juego.id,  balance: juego.balance, name: item.nombre})) : []
          );
          const filteredBalances = balances.filter(entry => entry.balance !== "null" && entry.balance !== "0");
          filteredBalances.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));

          // Take the top 5 participants
          console.log(filteredBalances);
          const topFive = filteredBalances.slice(0, 4);
          console.log(topFive);
          setTopParticipants(topFive);
        }
        setGameData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const columns = [
    { field: 'name', headerName: 'Participant Name', width: 200 },
    { field: 'balance', headerName: 'Balance', type: 'number', width: 150 }
  ];

  if (!gameData) {
    return <div>Loading...</div>;
  }

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