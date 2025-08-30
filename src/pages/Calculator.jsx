import React from 'react';
import PoppingTitle from '../components/PoppingTitle';
import CalorieMacroCalculator from '../components/calorieCalculator';

const Calculator = () => {
  return (
    <div className="flex flex-col items-center w-full bg-black h-screen overflow-y-scroll ">
    <div className='mt-10'>
      <PoppingTitle />
    </div>
    <div>
      <CalorieMacroCalculator/>
    </div>
    </div>
  );
}

export default Calculator;
