
import {GET_DATA_FOR_GRAP} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// import numeral from "numeral";


function LineGraph({ casesType }) {
  const [data, setData] = useState({});
  const {dat,refetch} = useQuery(GET_DATA_FOR_GRAP,{onCompleted:({getDataForGrap})=>{
    setData(getDataForGrap);
  }})

let color = "rgb(167, 11, 153)";
let caseData=data.cases;
switch(casesType){
  case "deaths": 
    color = "rgb(222, 13, 45)"
    caseData = data.deaths
    break;
      case "recovered":
        color = "rgb(125, 215, 29)"
        caseData = data.recovered
    break;
  default:
    color = "rgb(167, 11, 153)"
    caseData = data.cases
    break;
}


const dd= caseData?.map(d=>d.x);
const va= caseData?.map(d=>d.y);

const datas = {
  labels: dd,
  datasets: [
    {
      label: casesType,
      data: va,
      fill: false,
      backgroundColor: color,
      borderColor: color
    },
  ]
};
  return (
    <div>
        <Line
        data={datas}
        />
    </div>
  );
}

export default LineGraph;