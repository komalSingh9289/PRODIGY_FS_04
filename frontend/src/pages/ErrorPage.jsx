// src/pages/ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/errorpage.svg";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <img src={error} width={250}/>
      <p className="text-sm mt-2 mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="text-xs text-pink-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
