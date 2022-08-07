import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Boutique } from '../../shared/types'

import { targetIcon, visitorIcon } from "./constants";
import { MapWrapper } from './styles' 

const FullMap = ({userLocation, boutiques}: any) => {
  const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound",(e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);

    return position && (
      <Marker position={position} icon={visitorIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapWrapper>
      <MapContainer
      center={{
        lat: userLocation.latitude || 0,
        lng: userLocation.longitude || 0
      }}
      zoom={3}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
          />

      <LocationMarker />
      {boutiques?.map(({ _id, slug, name, location }: Boutique) => {
          const { lat, lon } = location
          return (
            <Marker
            position={[lat, lon]}
              key={`map-boutique-${_id}`}
              title={name}
              icon={targetIcon}
            />
          )
        })}
    </MapContainer>
    </MapWrapper>
  );
};

export default FullMap;
