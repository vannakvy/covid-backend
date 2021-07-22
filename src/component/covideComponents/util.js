import React from "react";
import numeral from "numeral";
import { Circle, Popup,Marker,CircleMarker,Polygon} from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#a70b99",
    rgb: "rgb(167, 11, 153)",
    half_op: "rgba(167, 11, 153, 0.5)",
    multiplier: 100,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 100,
  },
  deaths: {
    hex: "#de0d2d",
    rgb: "rgb(222, 13, 45)",
    half_op: "rgba(222, 13, 45, 0.5)",
    multiplier: 400,
  },

};

export const joinArray = (arr1, arr2) => {
  let arr = []
  arr1.map(load => {
      arr2.map(load1 => {
          if(load1.district === load._id){
              arr.push({...load, ...load1})
          }
      })
  })
return arr;
}

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.confirmedCase > b.confirmedCase) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data?.map((quarantineInfo) => (
    <Circle
      center={[quarantineInfo.lat, quarantineInfo.long]}
      color={casesTypeColors[casesType].hex}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      fillOpacity={0.4}
      radius={
        5000
        // Math.sqrt(quarantineInfo[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          {/* <div
            className="info-flag"
            style={{ backgroundImage: `url(${quarantineInfo.quarantineInfoInfo.flag})` }}
          ></div> */}
          <div className="info-name">{quarantineInfo.district}</div>
          <div className="info-confirmed">
            Cases: {numeral(quarantineInfo.confirmedCase).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(quarantineInfo.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(quarantineInfo.death).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
 

  export const showQuarantineInfoOnMap = (data) =>
  data?.map((quarantineInfo) => (
    <Circle
      center={[quarantineInfo?.lat, quarantineInfo?.long]}
      color="yellow"
      pathOptions={{
        color: "gray",
        fillColor: "white",
      }}
      fillOpacity={0.8}
      radius={
        5000
        // Math.sqrt(quarantineInfo[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          {/* <div
            className="info-flag"
            style={{ backgroundImage: `url(${quarantineInfo.quarantineInfoInfo.flag})` }}
          ></div> */}
          <div className="info-name">{quarantineInfo.locationName}</div>
          
          <div className="info-confirmed">
            សមត្តភាពផ្ទុក: {numeral(quarantineInfo.capacity).format("0,0")}
          </div>
          <div className="info-recovered">
            អាស័យដ្ធាន: {quarantineInfo.village } {quarantineInfo.commune } {quarantineInfo.district } {quarantineInfo.province }
          </div>
          <div className="info-deaths">
            អ្នកទទួលខុសត្រូវ: {quarantineInfo.personInCharge.firstName}  {quarantineInfo.personInCharge.lastName}
          </div>
          <div className="info-deaths">
            តួនាទី: {quarantineInfo.personInCharge.position}  
          </div>
          <div className="info-deaths">
            ទូរស័ព្ទ: {quarantineInfo.personInCharge.tel}  
          </div>
        </div>
      </Popup>
    </Circle>
  ));


  //
  export const  showHospitalInfoOnMap = (data) =>
  data?.map((hospitalInfo) => (
    <Circle
      center={[hospitalInfo?.lat, hospitalInfo?.long]}
      color="yellow"
      pathOptions={{
        color: "red",
        fillColor: "white",
      }}
      fillOpacity={0.8}
      radius={
        5000
        // Math.sqrt(hospitalInfo[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          {/* <div
            className="info-flag"
            style={{ backgroundImage: `url(${hospitalInfo.hospitalInfoInfo.flag})` }}
          ></div> */}
          <div className="info-name">{hospitalInfo.hospitalName}</div>
          
          <div className="info-recovered">
            អាស័យដ្ធាន: {hospitalInfo.village } {hospitalInfo.commune } {hospitalInfo.district } {hospitalInfo.province }
          </div>
          <div className="info-deaths">
            អ្នកទទួលខុសត្រូវ: {hospitalInfo.personInCharge.firstName}  {hospitalInfo.personInCharge.lastName}
          </div>
          <div className="info-deaths">
            តួនាទី: {hospitalInfo.personInCharge.position}  
          </div>
          <div className="info-deaths">
            ទូរស័ព្ទ: {hospitalInfo.personInCharge.tel}  
          </div>
        </div>
      </Popup>
    </Circle>
  ));
