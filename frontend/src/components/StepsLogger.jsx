import React, { useState } from "react";
import StepDoughnutChart from "./DoughnutChart";

const StepsLogger = ({ steps, plus, minus }) => {
  const [totalSteps, setTotalSteps] = useState(5000);
  const remaining = totalSteps - steps;

  return (
    <div className="flex gap-6 py-8 px-8 md:px-14 w-[95%] md:h-[70%] md:w-1/3  bg-gradient-to-br from-violet-900/20 to-purple-950/30 rounded-xl shadow-inner shadow-white/20">
      <div>
        <span className="w-full flex flex-wrap gap-1 items-center mb-2">
          <h2 className="text-white text-md ">Steps goal : </h2>
          <input
            type=" text"
            placeholder="Steps"
            className="bg-transparent border border-white/20 rounded-md p-1 w-1/2"
            value={totalSteps}
            onChange={(e) => setTotalSteps(e.target.value)}
          />
        </span>
        <StepDoughnutChart
          totalSteps={totalSteps}
          remaining={remaining}
          steps={steps}
        />
      </div>
      <div className=" mt-7 flex flex-col gap-5 justify-center">
        <button
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center"
          onClick={minus}
        >
          -
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl flex items-center justify-center shadow-lg"
          onClick={() => plus(totalSteps)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default StepsLogger;
