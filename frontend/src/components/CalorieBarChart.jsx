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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const CalorieBarChart = ({ meals }) => {
  const labels = meals.map((m) =>
    new Date(m.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: meals.map((m) => m.totalcal),
        backgroundColor: "#2a9134",
        borderRadius: 10,
        borderWidth: 3,
        barThickness: 40,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
        maxBarThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="min-w-[300px] h-[150px]">
      <Bar data={data} options={options} /> 
    </div>
  );
};

export default CalorieBarChart;
