import React from 'react';
import {Landing} from './pages/Landing.jsx';
import Workout from './pages/Workout.jsx';
import NavMenu from './components/NavMenu.jsx';
import Food from './pages/Food.jsx';
import Login from './pages/Login.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Calculator from './pages/Calculator.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import SummaryPage from './pages/SummaryPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/workout',
    element: (
      <div className="flex">
        <NavMenu />
        <Workout/>
      </div>
    ),
  },
  {
    path: '/calculator',
    element: (
      <div className="flex">
        <NavMenu />
        <Calculator/>
      </div>
    ),
  },
  {
    path: '/food',
    element: (
      <div className="flex">
        <NavMenu />
        <Food/>
      </div>
    ),
  },
    {
    path: '/summary',
    element: (
      <div className="flex">
        <SummaryPage/>
      </div>
    ),
  },
  {
    path: '/login',
    element: (
      <div>
        <Login/>
      </div>
    ),
  },
   
]);

const App = () => {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  
  );
}

export default App;
