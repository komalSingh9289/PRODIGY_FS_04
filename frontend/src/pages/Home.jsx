import React, { useState } from "react";
import { Login } from "../Components/Login";
import Register from "../Components/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex p-6 flex-col items-center justify-center min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-extrabold  text-pink-300">Heylo - Say Hi, Stay Close</h1>

      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center border-b border-gray-200 w-full max-w-md mb-4">
        <ul className="flex justify-center -mb-px">
          <li className="me-2">
            <button
              onClick={() => setActiveTab("login")}
              className={`p-4 border-b-2 rounded-t-lg transition-colors duration-300 ${
                activeTab === "login"
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-400 hover:text-pink-600"
              }`}
            >
              Login
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("signup")}
              className={`p-4 border-b-2 rounded-t-lg transition-colors duration-300 ${
                activeTab === "signup"
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-gray-400 hover:text-pink-600"
              }`}
            >
              Signup
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="w-full mb-2 max-w-xs h-1/2 p-4 bg-purple-50 rounded-lg shadow-lg">
        {activeTab === "login" ? (
          <Login />
        ) : (
           <Register />
        )}
      </div>
     
    </div>
  );
};

export default Home;
