import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { databases, account } from "../../service/appwrite";
import { Query } from "appwrite";
import CalorieBarChart from "../components/CalorieBarChart";
import SleepAndWaterBarChart from "../components/SleepAndWaterBarChart";
import StepsBarChart from "../components/StepsBarChart";

const SummaryPage = () => {
  const [userId, setUserId] = useState("");
  const [meals, setMeals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [OtherData, setOtherData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const user = await account.get();
      setUserId(user.$id);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!userId) return;

    //Fetching meals
    const fetchData = async (userId) => {
      const today = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MEALS_ID,
        [
          Query.equal("userId", userId),
          Query.greaterThanEqual("date", sevenDaysAgo.toISOString()),
        ]
      );
      setMeals(res.documents);
    };
    fetchData(userId);
 
    //Fetching workout
    const fetchWorkoutData = async (userId) => {
      const today = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      const res = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID ,
      import.meta.env.VITE_APPWRITE_WORKOUT_ID,
        [
          Query.equal("userId", userId),
          Query.greaterThanEqual("date", sevenDaysAgo.toISOString()),
        ]
      );
     const formattedData = res.documents.map(doc => ({
      ...doc,
      todaysworkout: JSON.parse(doc.todaysworkout) // string → object/array
    }));
    setWorkouts(formattedData);
  };
  fetchWorkoutData(userId);

  //Fetching steps, water, sleep data
  const fetchOtherData = async (userId) => {
     const today = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);

      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_FITNESSDATA_ID,
        [
          Query.equal("userId", userId),
          Query.greaterThanEqual("date", sevenDaysAgo.toISOString()),
        ]
      );
      setOtherData(res.documents);
    
    };
    fetchOtherData(userId);

}, [userId]);

  return (
    <div className="w-full h-screen overflow-y-scroll bg-black text-white py-10 px-[4%] ">
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
          Last 7 Days Summary
          <p className="text-center text-sm lg:text-2xl lg:mt-4 mt-2 font-extralight">
            A snapshot of your health and habits from the last 7 days
          </p>
        </motion.h1>
      </div>
     { 
      meals.length === 0 || workouts.length === 0 || OtherData.length === 0 ? 
      <>
      <h1 className="text-3xl lg:text-6xl font-bold mt-32 text-center">Loading Last 7 Days Data</h1>
      <div className="flex justify-center my-2">
    <motion.div
    className="flex items-center justify-center text-white w-[20px] h-[20px] rounded-full bg-white"
    animate={{ y: 20 }}
    transition={{ type: "spring", stiffness: 200, damping: 20, repeat: Infinity, duration: 1 }}
    >
        
</motion.div>

<motion.div
    className="flex items-center justify-center text-white w-[20px] h-[20px] rounded-full bg-white"
    animate={{ y: 20 }}
    transition={{ type: "spring", stiffness: 200, damping: 20, repeat: Infinity, delay: 0.1, duration: 1 }}
    >
        
</motion.div>

<motion.div
    className="flex items-center justify-center text-white w-[20px] h-[20px] rounded-full bg-white"
    animate={{ y: 20 }}
    transition={{ type: "spring", stiffness: 200, damping: 20, repeat: Infinity, delay: 0.2, duration: 1 }}
    >
        
</motion.div>
      </div>
      </>
      :<><h1 className="text-6xl font-bold mt-32 text-center">Meals</h1>
      <div className="mt-1 lg:flex justify-evenly w-full">
        <div className="mt-8 w-[90%] mx-[5%] lg:mx-0 lg:w-[45%] h-80 overflow-y-scroll custom-scroll">
          {meals.map((meal, index) => (
            <div className=" my-2"  key={index}>
              <div className="p-3 bg-gray-900 rounded-lg">
                <p className="font-medium text-xl lg:text-2xl my-4 px-3">
                  {" "}
                  {new Date(meal.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex justify-between my-4 px-3">
                  <p className="text-gray-400 text-sm lg:text-xl border-2 border-gray-700 rounded-md  p-2">{meal.calories} Kcal</p>
                  <p className="text-gray-400 text-sm lg:text-xl border-2 border-gray-700 rounded-md p-2">
                    {meal.protien}g Protein
                  </p>
                  <p className="text-gray-400 text-sm lg:text-xl border-2 border-gray-700 rounded-md p-2  ">
                    {meal.carbohydrates}g Carbs
                  </p>
                  <p className="text-gray-400 text-sm  lg:text-xl border-2 border-gray-700 rounded-md p-2">{meal.fats}g Fat</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-[45%] mt-8">
        <CalorieBarChart meals={meals} />
        </div>
      </div>

       <h1 className="text-6xl font-bold mt-32 text-center">Workout</h1>
       <div className="w-full flex justify-center my-7 h-96 ">
        <div className="mt-1 w-full lg:w-1/2 bg-gray-900 rounded-lg py-7 px-3 overflow-y-scroll custom-scroll ">
         {
          workouts.map((workout, index)=>(
            <div key={index} className="mb-2">
             <p className="font-medium text-3xl my-10 px-3 text-center">
                  {" "}
                  {new Date(workout.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
             {
              workout.todaysworkout.map((item, index) => (
            <div key={index}>          
             <div className="flex justify-between items-center bg-gray-600 py-3 px-1 lg:px-14 rounded-lg mb-2">
                <p className="font-semibold text-sm">{item.exerciseName}</p>
                <p className="text-sm">{item.set} sets × {item.rep} reps</p>
                <p className="text-sm">{item.weight} kg</p>
              </div>
              </div>
            ))
          }
            </div>
          ))
        }
       </div>
    </div>
    <h1 className="text-6xl font-bold mt-32 text-center">Water & Sleep</h1>
    <div className="w-full flex justify-center lg:h-96 my-20">
      <SleepAndWaterBarChart OtherData = {OtherData}/>
    </div>

    <h1 className="text-6xl font-bold mt-32 text-center">Steps</h1>
    <div className="w-full flex justify-center lg:h-96 my-20">
      <StepsBarChart OtherData = {OtherData} />
    </div>
    </>
    }
    </div>
  );
};

export default SummaryPage;
