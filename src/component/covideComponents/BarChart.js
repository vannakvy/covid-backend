
import {GET_DATA_FOR_GRAP} from '../../graphql/dashboardAndReport'
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import numeral from "numeral";


function BarChart({ casesType }) {
  const [data, setData] = useState({});
 console.log(data)
  const {dat,refetch} = useQuery(GET_DATA_FOR_GRAP,{onCompleted:({getDataForGrap})=>{
    setData(getDataForGrap);
  }})



const cases= data.cases?.map(d=>d.x);
const casesValue= data.cases?.map(d=>d.y);

const deaths= data.deaths?.map(d=>d.x);
const deathsValue= data.deaths?.map(d=>d.y);

const recovered= data.recovered?.map(d=>d.x);
const recoveredValue= data.recovered?.map(d=>d.y);


  return (
    <div className="barChart">
      <Bar
      data={{
        labels:cases,
        datasets:[{
          label:'ករណីឆ្លង',
          data:casesValue,
          backgroundColor:'red',
          barThickness:12
        },
        { 
          label:'ករណីជាសះស្បើយ',
          data:deathsValue,
          backgroundColor:'green',
          barThickness:12
        },
        {
          label:'ករណីស្លាប់',
          data:deathsValue,
          backgroundColor:'orange',
          barThickness:12
        },
        ]
      }}
      options={{
        maintainAspectRatio: false,
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
            height:200,
          xAxes:[
            {
              gridLines:{
              display: false
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            grid:{
              display: false
             
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'blue',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
              
            }
          }
          ]
        }
      }}
      >

      </Bar>
    </div>
  );
}

export default BarChart;