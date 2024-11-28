import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Local loading state
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    await login(email, password);

    setLoading(false); // Set loading to false after login completes
  };

  return (
    <div>
      {loading && <Loader />}
      <h2 className="text-lg text-center font-bold mb-4 text-maroon">
        Welcome Back!
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-1">
          <label className="block text-gray-500 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-500 text-sm">Password</label>
          <input
            type="password"
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 text-sm bg-pink-600 rounded text-white font-semibold hover:bg-pink-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};
