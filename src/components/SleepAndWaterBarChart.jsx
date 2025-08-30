import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SleepAndWaterBarChart = ({OtherData}) => {

    const labels = OtherData.map((m) =>
    new Date(m.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Water Intake",
        data: OtherData.map((m) => m.waterIntake),
        backgroundColor: "#3b82f6",
        borderRadius: 10,
         borderWidth: 4,
        barThickness : 40,
        barPercentage: 0.6,     
        categoryPercentage: 0.9,
        maxBarThickness: 50,  
      },
       {
        label: "Sleep",
        data: OtherData.map((m) => m.sleep),
        backgroundColor: "#8338ec",
        borderRadius: 8,
        borderWidth: 4,
        barThickness : 40,
          barPercentage: 0.6,   
      categoryPercentage: 0.8,
      maxBarThickness: 50,  
        
      },
    ],
  };
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Water intake and Sleep (Last 7 Days)",
      },
    },
    scales: {
           x: {
      grid: {
        drawTicks: true,
        drawOnChartArea: false, 
        color: "#ffffff", 
    
      },
      ticks: {
        color: "#fff", 
      },
    },
      y: {
        grid: {
        drawTicks: true,
        drawOnChartArea: false, 
        color: "#ffffff", 
      },
      ticks: {
        color: "#fff", 
      },
     
        min: 0.5,
        max: 8,
        ticks: { callback: (v) => `${v} lit / hrs` },
      },
    },
  };


  return(
   <div className="w-full overflow-x-auto">
  <div className="min-w-[600px] h-[350px]">
    <Bar data={data} options={options} />
  </div>
</div>


  )
}

export default SleepAndWaterBarChart;
