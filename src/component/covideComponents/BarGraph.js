
import {GET_DATA_FOR_GRAP} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import numeral from "numeral";


function BarGraph() {
  const [data, setData] = useState({});

  const {dat,refetch} = useQuery(GET_DATA_FOR_GRAP,{onCompleted:({getDataForGrap})=>{
    setData(getDataForGrap);
  }})

let color = "rgb(167, 11, 153)";


// const dd= caseData?.map(d=>d.x);
// const va= caseData?.map(d=>d.y);

const a = [10,20,30,50];
const b =["ករណីឆ្លង","ករណីឆ្លង","ករណីឆ្លង","ករណីឆ្លង"];



const datas = {
  labels: b,
  datasets: [
    {
      label: "Total",
      data: a,
      fill: false,
      backgroundColor:["red","yellow","blue","green"],
      borderColor: color
    },
  ]
};
  return (
    <div>
        <Bar
        data={datas}
        />
    </div>
  );
}

export default BarGraph;