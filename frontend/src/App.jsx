import React from "react";
import { Landing } from "./pages/Landing.jsx";
import Workout from "./pages/LogActivity.jsx";
import Food from "./pages/Food.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calculator from "./pages/Calculator.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import LogActivity from "./pages/LogActivity.jsx";
import PageProvider from "./context/PageProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/log-activity",
    element: <LogActivity />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/calculator",
    element: (
      <div className="flex">
        <Calculator />
      </div>
    ),
  },
  {
    path: "/food",
    element: (
      <div className="flex">
        <Food />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <PageProvider>
      <RouterProvider router={router} />
    </PageProvider>
  );
};

export default App;
