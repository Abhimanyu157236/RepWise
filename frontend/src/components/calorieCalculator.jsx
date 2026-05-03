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
    let protein = weight * 1.5; // g
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
    <div className="h-full overflow-y-scroll md:flex gap-7 items-center justify-center w-full px-4 py-10 md:py-20">
      <div className=" py-3 w-[90%] md:w-1/4 mx-auto md:mx-0 bg-gradient-to-br from-violet-900/15 to-purple-950/15 flex flex-col items-center rounded-xl shadow-inner shadow-white/20">
        <h1 className="text-white font-bold text-lg my-5 border-b border-white">
          Calorie calculator
        </h1>
        <div className="flex flex-col items-center gap-3">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-[80%] p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-[80%] p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />
          <input
            type="number"
            placeholder="Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-[80%] p-2 outline-none border-b-2 border-slate-700 bg-transparent text-white"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-[80%] p-2 outline-none border-b-2 border-slate-700 bg-transparent text-gray-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-[80%] p-2 outline-none border-b-2 border-slate-700 bg-transparent text-gray-500"
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">
              Lightly active (exercise 1-3 days/week)
            </option>
            <option value="1.55">
              Moderately active (exercise 4-5 days/week)
            </option>
            <option value="1.725">
              Very active (intense exercise 6-7 days/week)
            </option>
          </select>

          <button
            onClick={calculateBMR}
            className="bg-[#A7C7E7] w-[80%] text-black py-2 rounded-lg font-semibold"
          >
            Calculate
          </button>
        </div>
      </div>
      <div className=" p-6 w-[90%] my-5 md:my-0 mx-auto md:mx-0 md:w-1/4 bg-gradient-to-br from-violet-900/15 to-purple-950/15 flex flex-col items-center rounded-xl shadow-inner shadow-white/20">
        <div className=" text-white w-full text-sm">
          <div className="py-3 flex justify-between">
            <p className="mr-10 text-center">
              <b>BMR:</b>
            </p>{" "}
            <p className="text-center ml-6">{result?.bmr || 0} kcal</p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="mr-10 text-center">
              <b>TDEE:</b>
            </p>{" "}
            <p className="text-center ml-6">{result?.tdee || 0} kcal</p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="mr-10 text-center">
              <b>Protein:</b>
            </p>{" "}
            <p className="text-center ml-6">{result?.protein || 0} g</p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="mr-10 text-center">
              <b>Fat:</b>
            </p>{" "}
            <p className="text-center ml-6">{result?.fat || 0} g</p>
          </div>
          <div className="py-3 flex justify-between">
            <p className="mr-10 text-center">
              <b>Carbs:</b>
            </p>{" "}
            <p className="text-center ml-6">{result?.carbs || 0} g</p>
          </div>
          <div>
            <div className="my-3 text-xs">
              <b>Healthy weight gain:</b>{" "}
              <span>
                {" "}
                +250 Kcal (focus on moderate carbs + 1.8 - 2g /gm of bodyweight
                ){" "}
              </span>
            </div>
            <div className="my-3 text-xs">
              <b>Healthy weight loss:</b>{" "}
              <span>
                {" "}
                -250 Kcal (focus on moderate carbs + 2 - 2.3g /gm of bodyweight
                )
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-6 w-[90%] md:mx-0 mx-auto md:w-1/4 md:h-full bg-gradient-to-br from-violet-900/15 to-purple-950/15 flex flex-col items-center rounded-xl shadow-inner shadow-white/20">
        <Pie
          className="w-44 h-44"
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
                backgroundColor: ["#8338ec", "#d00000", "#fcbf49"],
                borderWidth: 1,
                hoverOffset: 5,
                hoverBorderWidth: 2,
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
        <p className="my-3 px-4 text-center text-xs">
          <b>Note:</b> The values are approximate and may vary based on
          individual metabolism and other factors.
        </p>
      </div>
    </div>
  );
}
