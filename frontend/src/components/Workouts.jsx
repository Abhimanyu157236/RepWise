import { Clock } from "lucide-react";
import React, { useState } from "react";
import WorkoutHistory from "./WorkoutHistory";

const Workouts = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [set, setSet] = useState("");
  const [rep, setRep] = useState("");
  const [weight, setWeight] = useState("");
  const [tab, setTab] = useState("today");
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const [isEditable, setIsEditable] = useState(true);

  const addWorkout = () => {
    setTodaysWorkout((prev) => [...prev, { exerciseName, set, rep, weight }]);
    setExerciseName("");
    setRep("");
    setSet("");
    setWeight("");
  };
  console.log("todays workout", todaysWorkout);

  const trackWorkout = async () => {
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v1/track/track-workout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            workout: todaysWorkout,
            date: new Date(),
          }),
        },
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("An error had occured while saving the workout");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <span className="w-full flex gap-1 items-center mt-3 mb-7 px-2 font-semibold">
        <Clock size={19} className={tab === "history" ? "text-pink-500" : ""} />
        <p
          className={tab === "history" ? "text-pink-500 underline" : ""}
          onClick={() => setTab("history")}
        >
          History
        </p>
        <p className="mx-3">|</p>
        <p
          className={tab === "today" ? "text-pink-500 underline" : ""}
          onClick={() => setTab("today")}
        >
          Today
        </p>
      </span>
      {tab === "today" ? (
        <div className="px-4 md:px-8 w-full mx-auto h-[90%] md:h-[76%] overflow-y-scroll md:w-1/2  bg-gradient-to-br from-violet-900/20 to-purple-950/30 py-10 rounded-xl shadow-inner shadow-white/20">
          <h2 className="text-white text-xl font-semibold py-7 text-center">
            Today's Workout🏋️‍♂️
          </h2>
          <div
            className={`w-full flex justify-center flex-wrap gap-2 ${isEditable ? "block" : "hidden"}`}
          >
            <input
              className="bg-white/10 w-[75%] outline-none border-none text-white rounded-lg py-2 px-3"
              type="text"
              placeholder="Exercise name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
            <button
              className="w-[18%] rounded-lg bg-pink-600"
              onClick={addWorkout}
            >
              Add
            </button>
            <input
              className="bg-white/10 w-[29%] md:w-[31%] outline-none border-none text-white rounded-lg py-1 px-3"
              type="number"
              placeholder="Sets"
              value={set}
              onChange={(e) => setSet(e.target.value)}
            />
            <input
              className="bg-white/10 w-[29%] md:w-[31%]  outline-none border-none text-white rounded-lg py-1 px-3"
              type="number"
              placeholder="Reps"
              value={rep}
              onChange={(e) => setRep(e.target.value)}
            />
            <input
              className="bg-white/10 w-[29%] md:w-[31%]  outline-none border-none text-white rounded-lg py-1 px-3"
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="w-full h-56 my-3 overflow-y-scroll">
            {todaysWorkout.length > 0 &&
              todaysWorkout.map((workout, index) => (
                <div className="w-[97%] mx-auto max-h-[260px] my-3 p-4 shadow-inner shadow-white/30 bg-white/10 rounded-lg">
                  <p className="font-semibold">{workout.exerciseName}</p>
                  <div className="w-full flex gap-3 text-xs text-gray-400 mt-1">
                    <p>{workout.set} Sets |</p>
                    <p>{workout.rep} Reps |</p>
                    <p>{workout.weight} kg</p>
                  </div>
                </div>
              ))}
            <button
              className={
                todaysWorkout.length > 0
                  ? "bg-pink-600 rounded-2xl px-5 py-3 mx-4 "
                  : "hidden"
              }
              onClick={trackWorkout}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <WorkoutHistory />
      )}
    </div>
  );
};

export default Workouts;
