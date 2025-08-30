import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TotalMacroChart({ totalCal,totalProt, totalCarbs, totalFat }) {
  const Kcal = totalCal

  const data = {
    labels: ['Carbs', 'Fat', 'Protein'],
    datasets: [
      {
        data: [totalCarbs, totalFat, totalProt],
        backgroundColor: ['#6096ba', '#fca311', '#ff0054'], 
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '60%', // donut thickness
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-44 h-44 lg:w-56 lg:h-56 mx-auto mb-5">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
            <p className="text-sm font-semibold text-gray-400">{Kcal.toFixed(0)} Kcal</p>
          <p className="text-xs text-gray-300">Total Macros</p>
        </div>
      </div>
      <div className="flex justify-between my-3">
        <div >
            Carbs 
        </div>
        <div className='bg-[#6096ba] px-10'>
            
        </div>
      </div>
      <div className="flex justify-between my-3">
        <div>
            Fats
        </div>
        <div className='bg-[#fca311] px-10'>
          
        </div>
      </div>
      <div className="flex justify-between my-3">
        <div>
            Protein
        </div>
        <div className='bg-[#ff0054] px-10  '>
          
        </div>
      </div>
    </div>
  );
}
