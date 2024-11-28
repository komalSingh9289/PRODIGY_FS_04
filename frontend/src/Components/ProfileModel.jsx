import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const ProfileModal = ({ isOpen, onClose, name, email, profile }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-4 w-72 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>
        <div className="flex items-center">
          <img
            src={profile}
            alt="user"
            className="w-14 h-14 rounded-full border-2 border-gray-600 mr-4"
          />
          <div>
            <h2 className="text-sm font-bold">{name}</h2>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-2 bg-pink-800 text-xs rounded hover:bg-pink-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
