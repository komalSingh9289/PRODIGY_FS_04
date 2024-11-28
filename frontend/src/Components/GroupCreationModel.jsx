import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const GroupCreationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-sm font-bold text-gray-50 mb-4">
          Create New Group
        </h2>

        {/* Group Name Input */}
        <input
          type="text"
          placeholder="Group Name"
          className="w-full bg-gray-700 text-white p-1 text-xs rounded mb-4 focus:outline-none"
        />

        {/* Add User Input */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add User"
            className="flex-1 text-xs bg-gray-700 text-white p-1 rounded focus:outline-none mr-2"
          />
          <button
            className="bg-maroon text-white p-1 text-xs rounded-full hover:bg-pink-700"
          >
            <FaPlus />
          </button>
        </div>

        {/* Group Members List */}
    

        {/* Modal Action Buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white p-2 text-xs rounded hover:bg-gray-600 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-pink-600 text-white p-2 text-xs rounded hover:bg-pink-700"
            onClick={onClose}
          >
            Create Group
          </button>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default GroupCreationModal;
