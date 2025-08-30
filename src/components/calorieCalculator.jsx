import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CalorieMacroCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState(null);

  const calculateBMR = () => {
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let tdee = bmr * parseFloat(activity);

    // Macros calculation
    let protein = weight * 1.3; // g
    let fat = weight * 1.1; // g (average)
    let proteinCalories = protein * 4;
    let fatCalories = fat * 9;
    let carbsCalories = tdee - (proteinCalories + fatCalories);
    let carbs = carbsCalories / 4;

    setResult({
      bmr: bmr.toFixed(0),
      tdee: tdee.toFixed(0),
      protein: protein.toFixed(0),
      fat: fat.toFixed(0),
      carbs: carbs.toFixed(0),
    });
  };

  return (
    <div className="min-h-max bg-black flex flex-col lg:flex-row items-center justify-between w-full  px-4 py-8 lg:py-20" >
       
      <div className="bg-black p-6 w-full max-w-lg lg:ml-1  border-2 border-gray-800 rounded-2xl">

        {/* Inputs */}
        <div className="grid gap-3">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />
          <input
            type="number"
            placeholder="Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 outline-none border-b-2 border-slate-700 bg-transparent text-gray-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="p-2 outline-none border-b-2 border-slate-700 bg-transparent text-gray-500"
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly active</option>
            <option value="1.55">Moderately active</option>
            <option value="1.725">Very active</option>
            <option value="1.9">Extra active</option>
          </select>

          <button
            onClick={calculateBMR}
            className="bg-[#A7C7E7] text-black py-2 rounded-lg font-semibold"
          >
            Calculate
          </button>
        </div>
      </div>
       <div className={`w-full lg:w-[80%] ${result?"block ":"hidden "}border-2 border-gray-800 flex flex-col py-4 lg:mx-6 my-6 lg:my-0 px-7 lg:px-10 items-center justify-center rounded-2xl`}>
             {result && (
          <div className=" text-white w-full ">
            <div className="py-3 flex justify-between"><p className="mr-10 text-center"><b>BMR:</b></p> <p className="text-center ml-6">{result.bmr} kcal</p></div>
            <div className="py-3 flex justify-between"><p className="mr-10 text-center"><b>TDEE:</b></p> <p className="text-center ml-6">{result.tdee} kcal</p></div>
            <div className="py-3 flex justify-between"><p className="mr-10 text-center"><b>Protein:</b></p> <p className="text-center ml-6">{result.protein} g</p></div>
            <div className="py-3 flex justify-between"><p className="mr-10 text-center"><b>Fat:</b></p> <p className="text-center ml-6">{result.fat} g</p></div>
            <div className="py-3 flex justify-between"><p className="mr-10 text-center"><b>Carbs:</b></p> <p className="text-center ml-6">{result.carbs} g</p></div>
            <div>
              <div className="my-3"><b>Weight gain:</b> <span> +250 Kcal </span></div>
              <div className="my-3"><b>Weight loss:</b> <span> -250 Kcal </span></div>
            </div>
          
          </div>
        )}
        </div>
                    <div className={`py-4 text-white lg:mr-4 w-[100%] lg:w-[40%]  border-2 border-gray-800 rounded-2xl  ${result?"block ":"hidden "}`}>
              <Pie
                className="w-full h-full"
                data={{
                  labels: ["Protein", "Carbs", "Fat"],
                  datasets: [
                    {
                      label: "Calories",
                      data: [
                        result ? result.protein * 4 : 0,
                        result ? result.carbs * 4 : 0,
                        result ? result.fat * 9 : 0,
                      ],
                      backgroundColor: [
                        "#240B36",
                        "#157F1F",
                        "#8C2155",
                      ],
                      borderColor: "#000000",
                      borderWidth: 1,
                      hoverOffset: 22,
                      hoverBorderWidth: 6,
                    },
                  ],
                }}
                options={{
                 
                  plugins: {
                    legend: {
                      labels: { color: "#fff" },
                    },
                  },
                }}
              />
              <p className="my-3 px-4 text-center">
            <b>Note:</b> The values are approximate and may vary based on individual metabolism and other factors.
          </p>
            </div>

    </div>
  );
}
