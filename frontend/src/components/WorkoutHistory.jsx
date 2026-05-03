import React, { useEffect } from "react";

const WorkoutHistory = () => {
  const [workout, setWorkout] = React.useState([]);
  const [exercise, setExercise] = React.useState([]);
  const [date, setdate] = React.useState([]);
  const fetchWorkoutHistory = async () => {
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v1/fetch/fetch-workout",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const result = await res.json();
      console.log("result", result);
      if (result.existingWorkout) {
        result.existingWorkout.map((item) =>
          setdate((prev) => [...prev, item.date]),
        );
        result.existingWorkout.map((item) =>
          setWorkout((prev) => [...prev, item]),
        );
      }
    } catch (error) {
      alert("An error had occured while fetching the workout");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  console.log("workout history", workout);
  console.log("exercise history", exercise);
  console.log("date history", date);
  return (
    <div className="w-full h-full justify-center flex flex-wrap gap-4">
      {workout.map((item) => (
        <div className="px-4 w-full h-[90%] md:h-[50%] overflow-y-scroll md:w-[40%]  bg-gradient-to-br from-violet-900/20 to-purple-950/30 py-5 rounded-xl shadow-inner shadow-white/20">
          <h2 className="text-white text-md text-center">
            <b> Date : </b>
            {new Date(item.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })}
          </h2>
          <div className="w-full flex flex-wrap gap-3 overflow-y-scroll my-5">
            {item.exercises.map((data, index) => (
              <div className="w-[98%] md:w-[48%] mx-auto h-16 p-4 shadow-inner shadow-white/30 bg-white/10 rounded-lg">
                <p className="font-semibold">{data.exerciseName}</p>
                <div className="w-full flex gap-3 text-xs text-gray-400 mt-1">
                  <p>{data.set} Sets |</p>
                  <p>{data.rep} Reps |</p>
                  <p>{data.weight} kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
