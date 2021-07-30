
import {GET_FOR_BARGRAPH} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import numeral from "numeral";


function BarGraph() {
  const [data, setData] = useState({});

  const {refetch} = useQuery(GET_FOR_BARGRAPH,{onCompleted:({getDataForBarGraphTotal})=>{
    setData(getDataForBarGraphTotal);
  }})
let color = "rgb(167, 11, 153)";

const a = [data?.confirm,data?.recovered,data?.deaths,data?.confirm - data?.recovered];
const b =["ករណីឆ្លង","ករណីជាសះស្បើយ","ករណីស្លាប់","កំពុងសំរាកព្យាបាល"];



const datas = {
  labels: b,
  datasets: [
    {
      label: "Total",
      data: a,
      fill: false,
      backgroundColor:["purple","green","red","yellow"],
      borderColor: color
    },
  ]
};


  return (
    <div>
        <Bar
        data={datas}
        options= {
          {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
      }
        />
    </div>
  );
}

export default BarGraph;