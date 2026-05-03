import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import CalorieBarChart from "../components/CalorieBarChart";
import { UtensilsCrossed, Moon, GlassWater, Footprints } from "lucide-react";
import SleepLineChart from "../components/SleepLineChart";
import WaterAreaCharts from "../components/WaterAreaCharts";
import StepsChart from "../components/StepsChart";
import Header from "../components/Header";
import { PageContext } from "../context/PageProvider";

const Dashboard = () => {
  const { pageName } = useContext(PageContext);
  const [meals, setMeals] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    pageName("Dashboard");
  }, []);

  const name = localStorage.getItem("name");

  const fetchFoodData = async () => {
    try {
      const res = await fetch(
        "https://repwise-58m2.onrender.com/api/v1/fetch/fetch-calories",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const result = await res.json();
      if (result.existingFood) {
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const filteredData = result.existingFood.filter((meal) => {
          const mealDate = new Date(meal.createdAt);
          return mealDate >= sevenDaysAgo;
        });
        const data = filteredData.map((meal) =>
          setMeals((prev) => [...prev, meal]),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivityData = async () => {
    try {
      const res = await fetch(
        "https://repwise-58m2.onrender.com/api/v1/fetch/fetch-activity",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const result = await res.json();
      if (result.existingActivity) {
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const filteredData = result.existingActivity.filter((activity) => {
          const activityDate = new Date(activity.createdAt);
          return activityDate >= sevenDaysAgo;
        });
        const data = filteredData.map((activity) =>
          setActivity((prev) => [...prev, activity]),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodData();
    fetchActivityData();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll text-white py-7 px-5 md:px-[4%]">
      <header className="w-full">
        <Header />
      </header>
      <main className="w-full md:flex items-center justify-center rounded-md my-3">
        <Sidebar />
        <div className="w-full h-[70vh] md:h-[80vh] overflow-y-scroll py-4 md:px-8 flex flex-wrap gap-4">
          <div className="w-full md:w-[40%] overflow-x-scroll md:overflow-hidden py-5 px-3 md:px-20 bg-gradient-to-br from-violet-900/20 to-purple-950/30 backdrop-blur-md shadow-inner shadow-white/40 rounded-xl">
            <span className="flex gap-2 items-center mb-6 mx-7">
              <UtensilsCrossed size={23} color="#edede9" />
              <h1 className="text-[#edede9] text-sm md:text-2xl font-semibold ">
                {" "}
                Calories{" "}
              </h1>
            </span>
            {meals.length > 0 ? (
              <CalorieBarChart meals={meals} />
            ) : (
              <h1 className="mt-8 md:mt-20 text-center text-orange-400">
                No meals logged yet — start tracking to see your nutrition
                insights
              </h1>
            )}
          </div>
          <div className="w-full md:w-[57%] overflow-x-scroll md:overflow-hidden py-5 px-3  md:px-20 bg-gradient-to-br from-violet-900/20 to-purple-950/30 backdrop-blur-md shadow-inner shadow-white/40 rounded-xl">
            <span className="flex gap-2 items-center mb-6 mx-7">
              <Moon size={23} color="#edede9" />
              <h1 className="text-[#edede9] text-sm md:text-2xl font-semibold ">
                {" "}
                Sleep in hours{" "}
              </h1>
            </span>
            {activity.length > 0 ? (
              <SleepLineChart sleepData={activity} />
            ) : (
              <h1 className="mt-8 md:mt-20 text-center text-orange-400">
                No sleep data — start tracking your rest
              </h1>
            )}
          </div>
          <div className="w-full md:w-[57%] overflow-x-scroll md:overflow-hidden py-5 px-3  md:px-20 bg-gradient-to-br from-violet-900/20 to-purple-950/30 backdrop-blur-md shadow-inner shadow-white/40 rounded-xl">
            <span className="flex gap-2 items-center mb-6 mx-7">
              <GlassWater size={23} color="#edede9" />
              <h1 className="text-[#edede9] text-sm md:text-2xl font-semibold ">
                {" "}
                Water intake in litres{" "}
              </h1>
            </span>
            {activity.length > 0 ? (
              <WaterAreaCharts waterIntake={activity} />
            ) : (
              <h1 className="mt-8 md:mt-20 text-center text-orange-400">
                No water data — start tracking to stay hydrated
              </h1>
            )}
          </div>
          <div className="w-full md:w-[40%] overflow-x-scroll py-5 px-3 md:px-20 bg-gradient-to-br from-violet-900/20 to-purple-950/30 backdrop-blur-md shadow-inner shadow-white/40 rounded-xl">
            <span className="flex gap-2 items-center mb-6 mx-2">
              <Footprints size={23} color="#edede9" />
              <h1 className="text-[#edede9] text-sm md:text-2xl font-semibold ">
                Daily step goal{" "}
              </h1>
            </span>
            {activity.length > 0 ? (
              <StepsChart stepsTracker={activity} />
            ) : (
              <h1 className="mt-8 md:mt-20 text-center text-orange-400">
                No activity yet — your steps will appear here
              </h1>
            )}
          </div>
        </div>
        <MobileNavbar />
      </main>
    </div>
  );
};

export default Dashboard;
