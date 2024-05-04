import React from "react"; // Importa React
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet"; // Importa componentes de React Leaflet
import mexicoGeoJSON from "./mexico.geo.json"; // Importa datos GeoJSON de México

const MexicoMap = () => {
  return (
    <div style={{ height: "500px" }}>
      {/* Contenedor del mapa */}
      <MapContainer center={[23.6345, -102.5528]} zoom={5} style={{ height: "100%", width: "100%" }}>
        {/* Capa de azulejos para el mapa */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Componente GeoJSON para mostrar datos geográficos de México */}
        <GeoJSON data={mexicoGeoJSON} />
      </MapContainer>
    </div>
  );
};

export default MexicoMap; // Exporta el componente MexicoMap
