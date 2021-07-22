import React from "react";
import { MapContainer as LeafletMap, TileLayer,LayersControl } from "react-leaflet";
import "./Map.css";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { showDataOnMap,showQuarantineInfoOnMap ,showHospitalInfoOnMap} from "./util";
import { FaMapMarkedAlt } from 'react-icons/fa';
import {useQuery} from '@apollo/client'
import {ALL_QUARANTINEINFO} from '../../graphql/quarantine'
import {ALL_HOSPIAL_INFO} from '../../graphql/hospital'


// allHospitalInfos
function Map({ district, casesType, center, zoom }) {
  const [satellite, setSatellite] = React.useState(false);
  const [quantineData, setQuarantineData] = React.useState([]);
  const [hospitalData, setHospitalData] = React.useState([]);
  

  
  const { data: dd } = useQuery(ALL_QUARANTINEINFO, {
    onCompleted: ({ allQuarantineInfos }) => {
      setQuarantineData(allQuarantineInfos)
    },
  });

  const { data: dat } = useQuery(ALL_HOSPIAL_INFO, {
    onCompleted: ({ allHospitalInfos }) => {
      setHospitalData(allHospitalInfos)
    },
  });

  
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
         {showDataOnMap(district, casesType)}
         {showQuarantineInfoOnMap(quantineData)}
         {showHospitalInfoOnMap( hospitalData)}
        
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
