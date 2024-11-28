import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false); // Local loading state
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      profileImage: e.target.files[0],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profileImage", user.profileImage); // Append the file

    {
      /*for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }*/
    }
    //console.log("profileImage Name:", user.profileImage.name);
    
    await register(formData); // Pass formData instead of user object
    setLoading(false); // Set loading to false once registration completes

    setUser({
      name: "",
      email: "",
      password: "",
      profileImage: null,
    });
  };

  return (
    <div>
      {loading && <Loader />}

      <h2 className="text-lg text-center font-bold mb-4 text-maroon">
        Welcome to Heylo{" "}
      </h2>
      <p className="text-gray-500 text-xs px-2 text-center">
        Start a chat, make a friend, and enjoy every moment!
      </p>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <div className="mb-1">
          <label className="block text-gray-500 text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-500 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-500 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-500 text-sm">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-1 h-7 mt-1 rounded border border-black text-maroon"
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 text-sm bg-pink-600 rounded text-white font-semibold hover:bg-pink-700"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Register;
