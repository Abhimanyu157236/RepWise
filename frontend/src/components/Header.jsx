import React from "react";

const Header = () => {
  const name = localStorage.getItem("name");
  return (
    <div className="w-full flex items-center bg-white/10 shadow-inner shadow-white/20 rounded-md py-3 px-3 md:px-5">
      <img src="/biceps.png" alt="logo" className="w-6 h-6 mx-2" />
      <h1 className="text-md md:text-lg font-bold border-r border-white/30 pr-7">
        Repwise
      </h1>
      <p className="text-sm md:text-md px-6">
        {" "}
        Welcome back,{" "}
        <b> {name.split("")[0].toUpperCase() + name.slice(1)} </b>{" "}
      </p>
      <div className="hidden bg-sky-950 rounded-full w-9 h-9 md:flex items-start justify-center text-md text-sky-500 font-extralight py-1 relative left-[70%] ">
        {name.split("")[0].toUpperCase()}
      </div>
    </div>
  );
};

export default Header;
