import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StepDoughnutChart from "../components/DoughnutChart";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import {useNavigate} from "react-router-dom"
import {account ,databases, ID } from "../../service/appwrite";
import { Check } from "lucide-react";

const Workout = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [exerciseName, setExerciseName] = useState("");
  const [set, setSet] = useState("");
  const [rep, setRep] = useState("");
  const [weight, setWeight] = useState("");
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const [showPopup,setShowPopup] = useState(false)


  const addWorkout = () => {
    setTodaysWorkout([...todaysWorkout, { exerciseName, set, rep, weight }]);
    setRep("");
    setSet("");
    setWeight("");
    setExerciseName("")
  };

  const removeWorkout = (index) => {
    const updatedWorkout = todaysWorkout.filter((_, i) => i !== index);
    setTodaysWorkout(updatedWorkout);
  };

  const saveWorkoutToDB = async() => {
      const User = await account.get()

  try {
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,   
      import.meta.env.VITE_APPWRITE_WORKOUT_ID,
      ID.unique(),
      {
        userId: User.$id,
        todaysworkout : JSON.stringify(todaysWorkout),
        date : new Date().toISOString()
      },
      
    )
    setShowPopup(true)
    return response;
    
  } catch (error) {
    console.log(error)
  }
  }

  if(showPopup){
       setTimeout(() => {
          setShowPopup(false)
        },1500);
        
    }
  

  const saveStepsWaterSleepToDB = async() =>{
    const User = await account.get()
     try {
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,   
      import.meta.env.VITE_APPWRITE_FITNESSDATA_ID,
      ID.unique(),
      {
        userId: User.$id,
        date : new Date().toISOString(),
        steps : steps,
        waterIntake : water,
        sleep : sleep

      }, 
       )
     setShowPopup(true)
    return response;
    
    
    } catch (error) {
    console.log(error)
  }
  }

  return (
    <div className="w-full h-screen overflow-y-scroll bg-black text-white">
      <div className=" w-full">
        <div className="text-center py-7">
          <h1 className="text-2xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-[#2c6052] via-[#53aa7c]  to-[#59d66d] bg-clip-text text-transparent">
              Welcome to RepWise
            </span>{" "}
            🎉
          </h1>
          <p className="mt-1 text-md lg:text-2xl text-[#6bd3b7] ">
            Your journey to fitness starts here.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <motion.h1
          className="lg:text-6xl text-4xl font-bold white text-center"
          style={{ color: ["#A7C7E7"] }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          HealthWise
          <p className="text-center text-sm lg:text-2xl lg:mt-4 mt-2 font-extralight">
            {user
              ? "Track everything that matters — training, steps, sleep, water."
              : "Login to track workout and more."}
          </p>
        </motion.h1>
      </div>
     <div  className={`w-[30%] lg:w-1/12 flex bg-white rounded-lg py-1 px-4 border-b-8 border-[#2b5c0a] fixed top-[15%] lg:top-[25%] left-[6%] lg:left-[7%] ${showPopup ?"block":"hidden"}`}>
       <Check size={25} color="#2b5c0a" strokeWidth={4} className="mt-2"/>
        <h1 className="text-md lg:text-xl font-semibold py-1 text-[#2b5c0a] ml-2 ">
          Saved
        </h1>
     </div>
     { 
      user? 
      <><div className="w-full mt-7 lg:mt-16 lg:flex justify-center">
        <div className="bg-[#2A4D14] lg:w-[25%] w-[80%] flex rounded-xl items-center mx-[10%] lg:mx-5 py-3 px-7">
          <div className="py-7 px-5">
            <h1 className="text-2xl font-bold mb-4">Step Tracker🚶‍♂️</h1>
            <div className="flex">
              <StepDoughnutChart
                value={steps}
                name="steps"
                max="10000"
                remainColor="#317B22"
              />
              <div className=" text-xl flex flex-col lg:my-5 mx-3 ">
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    steps < 10000 && setSteps(steps + 100);
                  }}
                >
                  +
                </button>
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    steps > 0 && setSteps(steps - 100);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#00325c] lg:w-[25%] w-[80%] flex rounded-xl items-center mx-[10%] lg:mx-5 py-3 px-7 my-8 lg:my-0">
          <div className="py-7 px-5">
            <h1 className="text-2xl font-bold mb-4">Water Tracker💧</h1>
            <div className="flex">
              <StepDoughnutChart
                value={water}
                name="Liters"
                max="4"
                remainColor="#1160a0"
              />
              <div className=" text-xl flex flex-col lg:my-5 mx-3 ">
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    water < 4 && setWater(water + 0.5);
                  }}
                >
                  +
                </button>
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    water > 0 && setWater(water - 0.5);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#5A0001] lg:w-[25%] w-[80%] flex rounded-xl items-center mx-[10%] lg:mx-5 py-3 px-7 my-8 lg:my-0">
          <div className="py-7 px-5">
            <h1 className="text-2xl font-bold mb-4">Sleep Tracker😴</h1>
            <div className="flex">
              <StepDoughnutChart
                value={sleep}
                name="Hours"
                max="8"
                remainColor="#981215"
              />
              <div className=" text-xl flex flex-col lg:my-5 mx-3 ">
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    sleep < 8 && setSleep(sleep + 0.5);
                  }}
                >
                  +
                </button>
                <button
                  className="bg-black rounded-xl w-8 mx-3 py-2 px-2 my-2 text-center"
                  onClick={() => {
                    sleep > 0 && setSleep(sleep - 0.5);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-4 lg:w-1/5 flex items-center justify-center gap-2 bg-gradient-to-r from-[#cbcaa5] to-[#334d50] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition relative left-20 lg:left-[40%]"
          onClick={saveStepsWaterSleepToDB}
          >
            Save Tracked Data
          </button>
      <div className="max-w-4xl mx-auto p-4 text-white my-16 lg:my-24">
        <div className="bg-gray-900 rounded-2xl p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#cbcaa5]"
            />
            <input
              type="number"
              placeholder="Sets"
              value={set}
              onChange={(e) => setSet(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#cbcaa5]"
            />
            <input
              type="number"
              placeholder="Reps"
              value={rep}
              onChange={(e) => setRep(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#cbcaa5]"
            />
            <input
              type="number"
              placeholder="weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#cbcaa5]"
            />
          </div>
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#cbcaa5] to-[#334d50] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition"
            onClick={addWorkout}
          >
            <Plus size={20} /> Add Workout
          </button>
        </div>

        {/* Workout List */}
        <div className="mt-6 bg-gray-900 rounded-2xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Today's Workouts</h2>
          <div className="w-full flex flex-col">
            {todaysWorkout.length > 0 &&
              todaysWorkout.map((workout, index) => (
                <div
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2"
                  key={index}
                >
                  <div>
                    <p className="font-medium">{workout.exerciseName}</p>
                    <p className="text-sm text-gray-400">
                      {workout.set} sets x {workout.rep} reps | {workout.weight}kg
                    </p>
                  </div>
                  <button className="text-red-500 hover:text-red-400"
                  onClick={() => removeWorkout(index)}>
                    <Trash2 size={18}  />
                  </button>
                </div>
              ))}
          </div>
          <button className="mt-4 w-1/5 flex items-center justify-center gap-2 bg-gradient-to-r from-[#cbcaa5] to-[#334d50] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition"
          onClick={saveWorkoutToDB}
          >
            Save
          </button>
        </div>
      </div>
      </>
      :
      <div className="w-full flex justify-center">
      <button className="w-1/2 lg:w-[13%] rounded-lg py-2 text-xl lg:text-2xl font-semibold my-14 bg-[#ff3434]"
     onClick={()=>navigate('/login')}
     >
        Login
      </button>
      </div>
}
    </div>
  );
};

export default Workout;
