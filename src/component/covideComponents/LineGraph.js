import {GET_DATA_FOR_GRAP} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
// import numeral from "numeral";


function LineGraph({ casesType }) {
  const [data, setData] = useState({});
 console.log(data,"data")
  const {dat,refetch} = useQuery(GET_DATA_FOR_GRAP,{onCompleted:({getDataForGrap})=>{
    setData(getDataForGrap);
  }})

 
 
let color = "rgb(167, 11, 153)";
let caseData=data.cases;
let type ="ករណីឆ្លង"
switch(casesType){
  case "deaths": 
    color = "rgb(222, 13, 45)"
    caseData = data.deaths
    type ="ករណីស្លាប់"
    break;
      case "recovered":
        color = "rgb(125, 215, 29)"
        caseData = data.recovered
        type ="ករណីជាសះស្បើយ"
    break;
  default:
    color = "rgb(167, 11, 153)"
    caseData = data.cases
    type ="ករណីឆ្លង"
    break;
}


const dd= caseData?.map(d=>d.x);
const va= caseData?.map(d=>d.y);

const datas = {
  labels: dd,
  datasets: [
    {
      label: type,
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