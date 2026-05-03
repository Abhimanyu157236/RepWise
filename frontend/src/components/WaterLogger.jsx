import { useState } from "react";

export default function WaterLogger({ intake, addWater, reset }) {
  const goal = 5; // liters
  const perBottle = 1;

  const totalBottles = goal / perBottle;
  const filledBottles = Math.floor(intake / perBottle);
  const partialFill = (intake % perBottle) / perBottle;

  return (
    <div className=" py-8 px-8 md:px-14 w-[95%] md:h-[70%] md:w-1/3  bg-gradient-to-br from-violet-900/20 to-purple-950/30  rounded-xl shadow-inner shadow-white/20">
      <h2 className="text-white text-lg mb-3">Water Intake</h2>

      {/* Bottles */}
      <div className="flex gap-3 items-end">
        {[...Array(totalBottles)].map((_, i) => {
          const isFilled = i < filledBottles;
          const isPartial = i === filledBottles;

          return (
            <div
              key={i}
              className="w-10 h-24 rounded-2xl border border-white/10 relative overflow-hidden cursor-pointer"
            >
              {/* Fill */}
              <div
                className={`absolute bottom-0 left-0 w-full transition-all duration-500 ${
                  isFilled
                    ? "h-full bg-gradient-to-t from-blue-300 to-cyan-700"
                    : isPartial
                      ? "bg-gradient-to-t  from-blue-300 to-cyan-700"
                      : ""
                }`}
                style={{
                  height: isFilled
                    ? "100%"
                    : isPartial
                      ? `${partialFill * 100}%`
                      : "0%",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-4 text-white/70 text-sm">
        {intake.toFixed(1)}L / {goal}L
      </div>

      <span className="w-full flex gap-3">
        <button onClick={reset} className="mt-2 text-sm text-blue-400">
          Reset
        </button>
        <button
          onClick={() => addWater(goal)}
          className="mt-2 text-sm text-blue-400"
        >
          Add
        </button>
      </span>
    </div>
  );
}
