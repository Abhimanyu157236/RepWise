import React, { useContext } from "react";
import { House, User, UtensilsCrossed, Dumbbell, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../context/PageProvider";

const Sidebar = () => {
  const { page } = useContext(PageContext);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="hidden md:block h-full w-1/5 text-white bg-gradient-to-br from-violet-900/20 to-purple-950/30 py-10 rounded-xl shadow-inner shadow-white/20">
      <section className="w-full flex flex-col items-center mb-6">
        <div className="bg-sky-950 rounded-full w-24 h-24 flex items-start justify-center text-7xl text-sky-500 font-extralight py-1 shadow-md shadow-white/10">
          {name?.split("")[0].toUpperCase()}
        </div>
        <h1 className="text-xl mt-2 font-bold">
          {" "}
          {name?.split("")[0].toUpperCase() + name?.slice(1)}{" "}
        </h1>
        <p className="text-xs my-1">Repwise member</p>
      </section>
      <div className="w-full flex flex-col items-center">
        <div
          className={`w-full flex justify-start py-2 px-6 items-center gap-2 my-2 ${page === "Dashboard" ? "bg-gradient-to-r from-[#9a3dc5]/90 via-[#bf59b8]/80 to-[#fe378a]/60 " : ""}`}
        >
          <House size={26} color="#5a09be" />
          <p className={`text-lg `} onClick={() => navigate("/dashboard")}>
            Dashboard
          </p>
        </div>
        <div
          className={`w-full flex justify-start py-2 px-6 items-center gap-2 my-2 ${page === "food" ? "bg-gradient-to-r from-[#9a3dc5]/90 via-[#bf59b8]/80 to-[#fe378a]/60 " : ""}`}
        >
          <UtensilsCrossed size={26} color="#5a09be" />
          <p className="text-lg" onClick={() => navigate("/food")}>
            Add food
          </p>
        </div>
        <div
          className={`w-full flex justify-start py-2 px-6 items-center gap-2 my-2 ${page === "activity" ? "bg-gradient-to-r from-[#9a3dc5]/90 via-[#bf59b8]/80 to-[#fe378a]/60 " : ""}`}
        >
          <Dumbbell size={26} color="#5a09be" />
          <p className="text-lg" onClick={() => navigate("/log-activity")}>
            Log Activity
          </p>
        </div>
        <div
          className={`w-full flex justify-start py-2 px-6 items-center gap-2 my-2 ${page === "profile" ? "bg-gradient-to-r from-[#9a3dc5]/90 via-[#bf59b8]/80 to-[#fe378a]/60 " : ""}`}
          onClick={() => navigate("/profile")}
        >
          <User size={26} color="#5a09be" />
          <p className="text-lg">Profile</p>
        </div>
        <div
          className={`w-full flex justify-start py-2 px-6 items-center gap-2 my-2 `}
        >
          <PowerOff size={26} color="#5a09be" />
          <p className="text-lg" onClick={logout}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
