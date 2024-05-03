import React from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import mexicoGeoJSON from "./mexico.geo.json";

const MexicoMap = () => {
  return (
    <div style={{ height: "500px" }}>
      <MapContainer center={[23.6345, -102.5528]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={mexicoGeoJSON} />
      </MapContainer>
    </div>
  );
};

export default MexicoMap;
