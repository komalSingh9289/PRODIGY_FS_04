import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      const response = await api.post("/auth/register", formData);
      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const response = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // No token, stop loading
    }
  };

  const getUsers = async (loggedInUserId) => {
    try {
      const response = await api.get(`/auth/users?exclude=${loggedInUserId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout,getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
