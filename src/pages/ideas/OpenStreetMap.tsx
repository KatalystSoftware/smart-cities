import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { LatLng } from "leaflet";
import React, { useState, useRef } from 'react'
import { icon } from "leaflet"

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

const espooPosition = new LatLng(60.1841, 24.8301)  
const rounaboutPosition = new LatLng(60.188984, 24.834470)

import 'leaflet/dist/leaflet.css'

export default () => {
    return (
      <MapContainer
        center={rounaboutPosition}
        zoom={18}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "calc(100vh - 4rem)" }}
      >
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={rounaboutPosition}>
            <Popup>
              Wow this looks good
            </Popup>
          </Marker>
      </MapContainer>
    )
}
