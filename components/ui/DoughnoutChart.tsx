"use client"
import { Chart as ChartJS, ArcElement,Tooltip, Legend } from "chart.js"
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip,Legend)


function DoughnoutChart({accounts}:DoughnutChartProps) {
    const accountNames=accounts.map((a)=>a.name)
    const balence=accounts.map((a)=>a.currentBalance)
    const data={
        datasets:[
            {
                label:"Banks",
                data:balence,
                backgroundColor:["#fcc705","#2265d8","#2f91fa"]
            }
        ],
        labels:accountNames
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