import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { MdNotifications, MdGroupAdd } from "react-icons/md";
import ProfileModal from "../Components/ProfileModel";
import GroupCreationModal from "../Components/GroupCreationModel";
import NotificationModal from "../Components/NotificationModel";

const Topnav = ({ selectedFriend }) => {
  

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const toggleGroupModal = () => {
    setIsGroupModalOpen(!isGroupModalOpen);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  return (
    <div className="flex items-center justify-between bg-transparent p-2 border-b border-gray-700">
      {/* Display app name or selected friend's name */}
      <h1 className="text-xs font-bold text-pink-500">
        {selectedFriend ? selectedFriend.name : "Heylo Chat"}
      </h1>
      <div className="flex space-x-4">
        <MdNotifications
          onClick={toggleNotificationModal}
          className="cursor-pointer mt-2"
          size={20}
        />
        <MdGroupAdd
          onClick={toggleGroupModal}
          className="cursor-pointer mt-2"
          size={20}
        />
        <img
          src={user?.profileImage}
          alt="user"
          onClick={toggleProfileModal}
          className="w-8 h-8 rounded-full border-2 border-gray-600"
        />
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={toggleProfileModal}
        name={user?.name}
        email={user?.email}
        profile={user?.profileImage}
      />
      <GroupCreationModal
        isOpen={isGroupModalOpen}
        onClose={toggleGroupModal}
      />
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={toggleNotificationModal}
      />
    </div>
  );
};

export default Topnav;
