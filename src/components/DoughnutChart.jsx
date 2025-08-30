import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function StepDoughnutChart({ value = 0 ,name, max, remainColor }) {
  const totalSteps = 10000;
  const remaining = Math.max(max - value, 0);

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [value, remaining],
        backgroundColor: ['#2A0C4E', remainColor ], // dark blue and green
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // donut thickness
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-400">{value} / {max}</p>
          <p className="text-xs text-gray-300">{name}</p>
        </div>
      </div>
    </div>
  );
}
