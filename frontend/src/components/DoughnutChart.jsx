import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StepDoughnutChart({ totalSteps, remaining, steps }) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [steps, remaining],
        backgroundColor: ["#f3722c", "#fff2"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "64%", // donut thickness
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-40 h-40 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-400">
            {steps} / {totalSteps}
          </p>
          <p className="text-xs text-gray-300">steps</p>
        </div>
      </div>
    </div>
  );
}
