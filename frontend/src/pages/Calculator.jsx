import { useState, useContext, useEffect } from "react";
import CalorieMacroCalculator from "../components/calorieCalculator";
import MobileNavbar from "../components/MobileNavbar";
import Header from "../components/Header";
import { PageContext } from "../context/PageProvider";
import Sidebar from "../components/Sidebar";

const Calculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState(null);

  const { pageName } = useContext(PageContext);

  useEffect(() => {
    pageName("food");
  }, []);

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
    <div className="h-screen w-full overflow-y-scroll text-white py-7 px-5 md:px-[4%]">
      <header className="w-full">
        <Header />
      </header>
      <main className="w-full h-[80vh] overflow-y-scroll md:flex justify-center rounded-md my-3">
        <Sidebar />
        <CalorieMacroCalculator />
      </main>
      <MobileNavbar />
    </div>
  );
};

export default Calculator;
