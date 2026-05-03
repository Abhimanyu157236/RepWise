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

const StepsChart = ({ stepsTracker }) => {
  const labels = stepsTracker.map((s) =>
    new Date(s.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepsTracker.map((s) => s.steps),
        backgroundColor: "#ff6201",
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
export default StepsChart;
