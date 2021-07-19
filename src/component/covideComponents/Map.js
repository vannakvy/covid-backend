import React from "react";
import { MapContainer as LeafletMap, TileLayer,LayersControl } from "react-leaflet";
import "./Map.css";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { showDataOnMap } from "./util";
import { FaMapMarkedAlt } from 'react-icons/fa';
function Map({ countries, casesType, center, zoom }) {
  const [satellite, setSatellite] = React.useState(false);
  return (
    <div className="map ">
        <button className="layerSwitcher"
      onClick={() => setSatellite(!satellite)}
     >
      <FaMapMarkedAlt />

     </button>
      <LeafletMap center={center} zoom={zoom}>
      
 
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {showDataOnMap(countries, casesType)}

         {satellite ? (
       <ReactLeafletGoogleLayer
        googleMapsLoaderConf={{
         KEY: 'AIzaSyCLpho9FZOn3PUIt7Pm8R6GPTIQQrJ1_1M',
        }}
        type={'satellite'}
       />
      ) : null}
      </LeafletMap>
    </div>
  );
}

export default Map;
