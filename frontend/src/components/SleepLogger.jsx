import React from "react";
import { useState } from "react";

const SleepLogger = ({ sleep, increase, decrease }) => {
  const goal = 10;
  const getColor = () => {
    const percent = (sleep / goal) * 100;
    if (percent < 50) return "bg-red-400";
    if (percent < 80) return "bg-yellow-400";
    return "bg-green-400";
  };

  const percent = (sleep / goal) * 100;

  return (
    <div className="py-8 px-8 md:px-14 w-[95%]  md:w-1/4   bg-gradient-to-br from-violet-900/20 to-purple-950/30 rounded-xl shadow-inner shadow-white/20">
      <div className="w-full">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Sleep</span>
          <span>
            {sleep}h / {goal}h
          </span>
        </div>

        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${getColor()} transition-all duration-500`}
            style={{ width: `${(sleep / goal) * 100}%` }}
          />
        </div>
      </div>
      <p className="text-xs mt-2 text-white/60">
        {sleep < 5 && "😴 Too little sleep"}
        {sleep >= 5 && sleep < 7 && "🙂 Decent"}
        {sleep >= 7 && "🔥 Great sleep"}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={decrease}
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center"
        >
          −
        </button>

        <button
          onClick={() => increase(goal)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl flex items-center justify-center shadow-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SleepLogger;
