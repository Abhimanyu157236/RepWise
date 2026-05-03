import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
Chart.register([
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
]);
const SleepLineChart = ({ sleepData }) => {
  const labels = sleepData?.map((m) =>
    new Date(m.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
  );
  const val = sleepData.map((m) => m.sleep);
  const data = {
    labels: labels,
    datasets: [
      {
        data: val,
        fill: false,
        borderColor: "#da627d",
        tension: 0.1,
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
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default SleepLineChart;
