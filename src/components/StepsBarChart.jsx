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

const StepsBarChart = ({OtherData}) => {

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
        label: "Steps (Last 7 days)",
        data: OtherData.map((m) => m.steps),
        backgroundColor: "#4caf50",
        borderRadius: 10,
         borderWidth: 4,
        barThickness : 90,
        barPercentage: 0.6,     
        categoryPercentage: 0.9,
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
        text: "Steps (Last 7 Days)",
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
        min: 1000,
        max: 10000,
        ticks: { callback: (v) => `${v} steps` },
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


export default StepsBarChart;
