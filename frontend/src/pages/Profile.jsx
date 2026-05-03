import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PageContext } from "../context/PageProvider";

const Profile = () => {
  const name = localStorage.getItem("name");

  const { pageName } = useContext(PageContext);
  useEffect(() => {
    pageName("profile");
  }, []);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [tdee, setTdee] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [saved, setSaved] = useState(false);

  const calculateBMR = () => {
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    let tdee = (bmr * 1.6).toFixed(0);
    setTdee(tdee);
  };

  useEffect(() => {
    if (weight && height && age) {
      calculateBMR();
    }
  }, [weight, height, age, gender]);

  const saveProfile = async () => {
    try {
      const res = await fetch(
        "https://repwise-58m2.onrender.com/api/v2/user/profile-router",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: name,
            age,
            height,
            weight,
            gender,
            goal,
            tdee,
          }),
        },
      );
      const data = await res.json();
      alert(data.message);
      setSaved(true);
    } catch (error) {
      alert("An error had occured while saving the profile");
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        "https://repwise-58m2.onrender.com/api/v2/user/get-profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      if (data.existingUser) {
        setAge(data.existingUser.age);
        setHeight(data.existingUser.height);
        setWeight(data.existingUser.weight);
        setGender(data.existingUser.gender);
        setGoal(data.existingUser.goal);
        setTdee(data.existingUser.maintainance);
        setSaved(true);
      }
    } catch (error) {
      alert("An error had occured while saving the profile");
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
      <main className="w-full h-[70vh] md:h-[80vh]  overflow-y-scroll md:flex justify-center rounded-md my-3 ">
        <Sidebar />
        <div className="w-full flex flex-col flex-wrap p-6 md:px-24 gap-4">
          Name :{" "}
          <input
            type="text"
            value={name.split("")[0].toUpperCase() + name.slice(1)}
            className="bg-white/5 md:w-1/3  outline-none border-none text-white rounded-lg p-3 cursor-not-allowed"
            readOnly
          />
          Age :
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bg-white/10 md:w-1/3  outline-none border-none text-white rounded-lg p-3"
          />
          Height :
          <input
            type="number"
            placeholder="Height in Centimeters"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-white/10 md:w-1/3  outline-none border-none text-white rounded-lg p-3"
          />
          Weight :{" "}
          <input
            type="number"
            placeholder="Weight in Kilograms"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-white/10 md:w-1/3  outline-none border-none text-white rounded-lg p-3"
          />
          Gender
          <select
            onClick={(e) => setGender(e.target.value)}
            className="bg-white/10 md:w-1/3  outline-none border-none rounded-lg p-3"
          >
            {["Male", "Female"].map((item) => (
              <option value={item} key={item} className="text-black">
                {item}
              </option>
            ))}
          </select>
          Goal :{" "}
          <select
            onChange={(e) => setGoal(e.target.value)}
            className="bg-white/10 md:w-1/3  outline-none border-none rounded-lg p-3"
          >
            {[
              "Maintain weight",
              "Mild weight loss",
              "Weight loss",
              "Extreme weight loss",
              "Mild weight gain",
              "Weight gain",
              "Extreme weight gain",
            ].map((item) => (
              <option value={item} key={item} className="text-black">
                {item}
              </option>
            ))}
          </select>
          Maintainance kcal :{" "}
          <input
            type="text"
            readOnly
            value={tdee}
            className="bg-white/5 md:w-1/3 outline-none border-none text-white rounded-lg p-3"
          />
          <button
            className={`bg-pink-600 md:w-1/3 outline-none border-none text-white rounded-lg p-3 font-semibold ${saved ? "hidden" : "block"}`}
            onClick={saveProfile}
          >
            Save profile
          </button>
        </div>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default Profile;
