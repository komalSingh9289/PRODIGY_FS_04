import React from 'react';

const notifications = [
  { message: "Alice liked your post", time: "2 mins ago" },
  { message: "Bob sent you a message", time: "5 mins ago" },
  { message: "Charlie joined your group", time: "10 mins ago" },
  // Add more notifications as needed
];

const NotificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-72">
        <h2 className="text-lg font-bold text-pink-500 mb-4">Notifications</h2>
        
        {/* Notification List */}
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {notifications.map((notification, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded flex justify-between items-center">
              <span className="text-white text-xs">{notification.message}</span>
              <span className="text-gray-200 text-xxs">{notification.time}</span>
            </li>
          ))}
        </ul>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-maroon cursor-pointer text-xs text-white p-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    </div>
  );
};

export default NotificationModal;
