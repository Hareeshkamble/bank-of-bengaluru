"use client"
import { Chart as ChartJS, ArcElement,Tooltip, Legend } from "chart.js"
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip,Legend)


function DoughnoutChart({accounts}:DoughnutChartProps) {
    const data={
        datasets:[
            {
                label:"Banks",
                data:[1000, 4000, 6000],
                backgroundColor:["#fcc705","#2265d8","#2f91fa"]
            }
        ],
        labels:[
            "Bank 1",
            "Bank 2",
            "Bank 3",
        ]
    }
  return (
<Doughnut data={data} 
options={{
    cutout:"60%",
    plugins:{
        legend:{
            display:false
        }
    }
}}/>

  )
}

export default DoughnoutChart