import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Activity from "../components/Activity";
import StepsLogger from "../components/StepsLogger";
import { PageContext } from "../context/PageProvider";
import Workouts from "../components/Workouts";
import FitNotes from "../components/FitNotes";

const LogActivity = () => {
  const navigate = useNavigate();
  const { pageName } = useContext(PageContext);
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tab, setTab] = useState("Activity");

  useEffect(() => {
    pageName("activity");
  }, []);

  if (showPopup) {
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  }

  return (
    <div className="h-screen w-full overflow-y-scroll text-white py-7 px-5 md:px-[4%]">
      <header className="w-full">
        <Header />
      </header>
      <main className="w-full md:flex items-center rounded-md my-3">
        <Sidebar />
        <div className="w-full h-[70vh] md:h-[81vh] overflow-y-scroll py-4 px-2 md:px-8 flex flex-wrap gap-4">
          <section className="w-full h-[10%] flex gap-1 md:gap-3 justify-start">
            <span
              className={`w-1/3 md:w-1/6 p-4  backdrop-blur-md shadow-inner shadow-white/40 rounded-xl ${tab === "Activity" ? "bg-gradient-to-br from-pink-500 to-pink-950" : "bg-gradient-to-br from-pink-800/20 to-purple-950/20"}`}
              onClick={() => setTab("Activity")}
            >
              Activity
            </span>
            <span
              className={`w-1/3 md:w-1/6 p-4  backdrop-blur-md shadow-inner shadow-white/40 rounded-xl ${tab === "Workout" ? "bg-gradient-to-br from-pink-500 to-pink-950" : "bg-gradient-to-br from-pink-800/20 to-purple-950/20"}`}
              onClick={() => setTab("Workout")}
            >
              Workouts
            </span>
            <span
              className={`w-1/3 md:w-1/6 p-4  backdrop-blur-md shadow-inner shadow-white/40 rounded-xl ${tab === "FitNotes" ? "bg-gradient-to-br from-pink-500 to-pink-950" : "bg-gradient-to-br from-pink-800/20 to-purple-950/20"}`}
              onClick={() => setTab("FitNotes")}
            >
              Fit-Notes
            </span>
          </section>
          {tab === "Activity" && <Activity />}
          {tab === "Workout" && <Workouts />}
          {tab === "FitNotes" && <FitNotes />}
        </div>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default LogActivity;
