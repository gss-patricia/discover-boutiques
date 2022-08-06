import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import visitorIcon from "./constants";
import { MapWrapper } from './styles' 

const FullMap = () => {
  // visitor geoLocalisation on the Map
  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);

    return position === null ? null : (
      <Marker position={position} icon={visitorIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapWrapper>
      <MapContainer
      center={[48.856614, 2.3522219]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
          />

      <LocationMarker />
    </MapContainer>
    </MapWrapper>
  );
};

export default FullMap;
