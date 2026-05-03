import React, { useContext } from "react";
import { House, User, UtensilsCrossed, Dumbbell, PowerOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../context/PageProvider";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { page } = useContext(PageContext);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-[92%] px-2 flex gap-2 justify-evenly md:hidden py-3 bg-gradient-to-br from-[#1f132f] to-[#280046]/30 rounded-xl shadow-inner shadow-white/20 fixed top-[85%]">
      <div
        className={` py-3 px-4 rounded-lg ${page === "Dashboard" ? "bg-pink-300" : ""}`}
      >
        <House
          size={23}
          color="#5a09be"
          onClick={() => navigate("/dashboard")}
        />
      </div>
      <div
        className={` py-3 px-4 rounded-lg ${page === "food" ? "bg-pink-300" : ""}`}
      >
        <UtensilsCrossed
          size={23}
          color="#5a09be"
          onClick={() => navigate("/food")}
        />
      </div>

      <div
        className={` py-3 px-4 rounded-lg ${page === "activity" ? "bg-pink-300" : ""}`}
      >
        <Dumbbell
          size={23}
          color="#5a09be"
          onClick={() => navigate("/log-activity")}
        />
      </div>

      <div
        className={` py-3 px-4 rounded-lg ${page === "profile" ? "bg-pink-300" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <User size={23} color="#5a09be" />
      </div>

      <div className={` py-3 px-4 rounded-lg `} onClick={logout}>
        <PowerOff size={23} color="#5a09be" />
      </div>
    </div>
  );
};

export default MobileNavbar;
