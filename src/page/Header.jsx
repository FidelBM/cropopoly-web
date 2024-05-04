/*
Autor:            Estefanía Rico

El código hace un Header del Dashboard
*/
import { Typography, Box, useTheme } from "@mui/material"; // Importa Typography, Box y useTheme desde Material-UI
import { tokens } from "../theme"; // Importa tokens desde el tema personalizado

const Header = ({ title, subtitle }) => {
  const theme = useTheme(); // Obtiene el tema actual
  const colors = tokens(theme.palette.mode); // Obtiene los colores del tema utilizando la función tokens
  return (
    <Box mb="30px"> {/* Caja contenedora con margen inferior */}
      <Typography
        variant="h2"
        color={colors.grey[100]} // Color del título obtenido del tema
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }} // Estilos adicionales utilizando el sistema de diseño de Material-UI
      >
        {title} {/* Título */}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}> {/* Subtítulo */}
        {subtitle} {/* Contenido del subtítulo */}
      </Typography>
    </Box>
  );
};

export default Header; // Exporta el componente Header
