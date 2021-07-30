import React from 'react'
import {Line} from 'react-chartjs-2'
function LineChartTesting() {
    // <block:setup:1>
const labels = ["Janurary","February","mar"]
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.3
  }]
};

const options={
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
  
}
return <div>
<Line data={data} options={options} />
</div>




}

export default LineChartTesting
