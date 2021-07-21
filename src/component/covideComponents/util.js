import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

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
  data?.map((country) => (
    <Circle
      center={[country.lat, country.long]}
      color={casesTypeColors[casesType].hex}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      fillOpacity={0.4}
      radius={
        5000
        // Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          {/* <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div> */}
          <div className="info-name">{country.district}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.confirmedCase).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.death).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
