import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { hover } from "framer-motion";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieBarChart= ({ meals }) => {
  
  const labels = meals.map((m) =>
    new Date(m.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: meals.map((m) => m.calories),
        backgroundColor: "#ff006e",
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
        text: "Calories (Last 7 Days)",
      },
    },
    scales: {
          x: {
      grid: {
        drawTicks: true,
        drawOnChartArea: false,
        color: "#ffffff"
      },
      ticks: {
        color: "#fff"
      },
    },
      y: {
         grid: {
        drawTicks: true,
        drawOnChartArea: false, 
        color: "#ffffff", 
      },
      ticks: {
        color: "#fff"
      },
        min: 600,
        max: 3000,
        ticks: { callback: (v) => `${v} kcal` },
      },
    },
  };

  return (
      <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] h-[350px]">
            <Bar data={data} options={options} />
          </div>
        </div>
  )
};

export default CalorieBarChart;
