
import {GET_DATA_FOR_GRAP} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import numeral from "numeral";


function BarChart({ casesType }) {
  const [data, setData] = useState({});
  const {dat,refetch} = useQuery(GET_DATA_FOR_GRAP,{onCompleted:({getDataForGrap})=>{
    setData(getDataForGrap);
  }})




const dd= ["dfds","dfd","hels","dgd"]
const va= [10,20,30,40];

const datas = {
 
  labels: dd,
  datasets: [
    {
      label: "Data",
      data: va,
      fill: false,
      backgroundColor: "yellow",
      borderColor: "red"
    },
  ]
};
  return (
    <div style={{height:"400px"}}>
        <Line
        data={datas}
        options={{
          maintainAspectRatio: false,
        }}
        />
    </div>
  );
}

export default BarChart;