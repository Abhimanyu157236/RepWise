import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogIn,
  LogOut,
  History,
  Dumbbell,
  Calculator,
  Apple,
  
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const NavMenu = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#191919] text-white p-4 w-[15%] lg:w-[5%] h- border-r-2 border-r-slate-800">
      <ul>
        <li className="my-7 w-7 lg:w-10">
          <NavLink to="/workout">
            <Dumbbell
              size={32}
              color="#f96767"
              strokeWidth={2}
              className="my-4"
            />
          </NavLink>
        </li>
        <li className="my-7 w-7 lg:w-10">
          <NavLink to="/Calculator">
            <Calculator
              size={32}
              color="#f96767"
              strokeWidth={2}
              className="my-4"
            />
          </NavLink>
        </li>

        <li className="my-7 w-7 lg:w-10">
          <NavLink to="/food">
            <Apple size={32} color="#f96767" strokeWidth={2} className="my-4" />
          </NavLink>
        </li>

        {user && (
          <li className="my-7 w-7 lg:w-10">
            <NavLink to="/summary">
              <History
                size={32}
                color="#f96767"
                strokeWidth={2}
                className="my-4"
              />
            </NavLink>
          </li>
        )}

        {user ? (
          <>
            <LogOut
              size={32}
              color="#f96767"
              strokeWidth={2}
              className="my-4"
              onClick={logOut}
            />
          </>
        ) : (
          <li className="my-7 w-7 lg:w-10">
            <NavLink to="/login">
              <LogIn
                size={32}
                color="#f96767"
                strokeWidth={2}
                className="my-4"
              />
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
