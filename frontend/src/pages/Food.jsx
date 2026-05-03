import React, { useState, useEffect, useContext } from "react";
import { PlusCircle, Search, Trash2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PageContext } from "../context/PageProvider";
import { PieChart, Pie, Cell } from "recharts";
import { MacroBar } from "../components/MacroBar";
import Loader from "../components/Loader";

const Food = () => {
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [prot, setProt] = useState(0);
  const [goal, setGoal] = useState(0);
  const [goalPro, setGoalPro] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalCarb, setGoalCarb] = useState(0);

  const calorieData = [
    { name: "Consumed", value: calories },
    { name: "Remaining", value: 2400 - calories },
  ];
  const COLORS = ["#a855f7", "#1f2937"];

  const navigate = useNavigate();
  const { pageName } = useContext(PageContext);
  const [food, setFood] = useState([]);
  const [FetchedFood, setFetchedFood] = useState([]);
  const [meals, setMeals] = useState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addFood = () => {
    if (input.trim() === "") return;
    setFood((prev) => [...prev, FetchedFood]);
    setCalories((prev) => prev + (FetchedFood?.calories || 0));
    setProt((prev) => prev + (FetchedFood?.protein_g || 0));
    setCarbs((prev) => prev + (FetchedFood?.carbohydrates_total_g || 0));
    setFat((prev) => prev + (FetchedFood?.fat_total_g || 0));
    setInput("");
    setFetchedFood([]);
    setLoading(false);
  };

  const deleteFood = (index) => {
    const item = food[index];
    setCalories((prev) => prev - (item.calories || 0));
    setProt((prev) => prev - (item.protein_g || 0));
    setCarbs((prev) => prev - (item.carbohydrates_total_g || 0));
    setFat((prev) => prev - (item.fat_total_g || 0));
    setFood((prev) => prev.filter((_, i) => i !== index));
  };

  console.log(food);
  console.log(FetchedFood);

  useEffect(() => {
    pageName("food");
  }, []);

  async function getFoodData(food) {
    setLoading(true);
    const res = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(food)}`,
      {
        headers: { "X-Api-Key": "Zb10R0afYpre65DA7OlzZbhr0c7m3LPERP9NJpTc" },
      },
    ).then((res) => res.json());
    if (!res.items || res.items.length === 0) {
      alert("No food data found. Please try again.");
      setLoading(false);
      return;
    }
    setFetchedFood(res.items[0]);
  }

  const saveMeal = async () => {
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v1/track/track-calories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            totalcal: calories,
            totalcarbs: carbs,
            totalprot: prot,
            totalfats: fat,

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

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        "http://10.186.250.225:5000/api/v2/user/get-profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      if (data.existingUser) {
        setGoal(data.existingUser.maintainance);
      } else {
        alert(
          "Please set up your profile to get accurate maintainance calories",
        );
        setGoal(2400);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll text-white py-7 px-5 md:px-[4%]">
      <header className="w-full">
        <Header />
      </header>
      <main className="w-full h-[80vh] overflow-y-scroll md:flex justify-center rounded-md my-3">
        <Sidebar />
        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div
              className="py-5 text-center bg-green-400/15 text-green-500 text-sm rounded-xl border border-white/10"
              onClick={() => navigate("/calculator")}
            >
              Know your maintainance
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <MacroBar
                label="Calories"
                value={calories.toFixed(0)}
                goal={goal}
                color="linear-gradient(to right, #b6ccfe, #abc4ff)"
              />
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <MacroBar
                label="Protein"
                value={prot.toFixed(0)}
                goal={((goal * 0.2) / 4).toFixed(0)}
                color="linear-gradient(to right, #06d6a0, #99d98c)"
              />
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <MacroBar
                label="Carbs"
                value={carbs.toFixed(0)}
                goal={((goal * 0.5) / 4).toFixed(0)}
                color="linear-gradient(to right, #b7245c, #e01e37)"
              />
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <MacroBar
                label="Fats"
                value={fat.toFixed(0)}
                goal={((goal * 0.3) / 9).toFixed(0)}
                color="linear-gradient(to right, #f59e0b, #f97316)"
              />
            </div>
          </div>
          <div className="w-full bg-gradient-to-br from-violet-900/15 to-purple-950/15 py-3  rounded-xl shadow-md mt-6">
            <h1 className="text-center text-white/80 text-lg mb-2">
              Track your meals
            </h1>
            <div>
              <div className="w-full flex justify-center items-center gap-3 px-5 py-4">
                <input
                  type="text"
                  className="w-3/4 bg-transparent border-2 border-violet-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter food name..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {FetchedFood?.length === 0 ? (
                  <button
                    className={`md:w-1/6 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 ${loading ? "py-4" : "py-2"} rounded-md `}
                    onClick={() => getFoodData(input)}
                  >
                    {loading ? <Loader /> : "Search"}
                  </button>
                ) : (
                  <button
                    className="md:w-1/6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors"
                    onClick={addFood}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-48 mb-3 md:h-[55%] overflow-y-scroll bg-gradient-to-br from-violet-900/15 to-purple-950/15 py-2 flex flex-col items-center rounded-xl shadow-md mt-6">
            <h1 className="text-center text-white/80 text-lg my-5">
              Your food list
            </h1>
            {food.length > 0 &&
              food.map((item, index) => (
                <div
                  key={index}
                  className="w-3/4 flex justify-between items-center py-2 px-4 my-2 border-b border-white/30"
                >
                  <div>
                    <h2 className="text-white text-lg md:text-2xl font-semibold">
                      {item?.name}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {item?.serving_size_g}g | {item?.calories} Calories
                    </p>
                  </div>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 size={20} onClick={() => deleteFood(index)} />
                  </button>
                </div>
              ))}
            <button
              className={` ${food?.length === 0 && "hidden"} md:w-1/6 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors my-3`}
              onClick={saveMeal}
            >
              Save Meal
            </button>
          </div>
        </div>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default Food;
