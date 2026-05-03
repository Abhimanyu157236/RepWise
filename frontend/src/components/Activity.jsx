import React, { useState } from "react";
import WaterTracker from "./WaterLogger";
import WaterLogger from "./WaterLogger";
import StepsLogger from "./stepsLogger";
import SleepLogger from "./SleepLogger";

const Activity = () => {
  const [intake, setIntake] = useState(0);
  const [steps, setSteps] = useState(0);
  const [sleep, setSleep] = useState(0);

  const addWater = (goal) => {
    if (intake < goal) {
      setIntake((prev) => prev + 0.5);
    }
  };

  const resetIntake = () => {
    setIntake(0);
  };

  const plus = (totalSteps) => {
    if (steps < totalSteps) {
      setSteps((prev) => prev + 100);
    }
  };

  const minus = () => {
    if (steps > 0) {
      setSteps((prev) => prev - 100);
    }
  };

  const increase = (goal) => {
    setSleep((prev) => Math.min(prev + 0.5, goal));
  };

  const decrease = () => {
    setSleep((prev) => Math.max(prev - 0.5, 0));
  };

  const saveActivity = async () => {
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v1/track/track-activity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            intake,
            steps,
            sleep,
            date: new Date(),
          }),
        },
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("An error had occured while saving the meal");
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      <div className="w-full flex flex-wrap justify-center gap-3">
        <WaterLogger intake={intake} addWater={addWater} reset={resetIntake} />
        <StepsLogger steps={steps} plus={plus} minus={minus} />
        <SleepLogger sleep={sleep} increase={increase} decrease={decrease} />
      </div>
      <button
        className={`${sleep === 0 || steps === 0 || intake === 0 ? "hidden" : "block"} md:w-1/6 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors my-5 mx-auto`}
        onClick={saveActivity}
      >
        Save activity
      </button>
    </div>
  );
};

export default Activity;
