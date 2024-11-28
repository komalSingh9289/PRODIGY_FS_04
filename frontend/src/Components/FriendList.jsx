import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { AuthContext } from "../Context/AuthContext";

const FriendList = ({ user, onSelectFriend }) => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const { getUsers } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?._id) { 
        setLoading(true); 
        const users = await getUsers(user._id); 
        if (users) {
          setUserList(users);
        }
        setLoading(false); // End loading
      }
    };

    fetchUsers();
  }, [user._id]);

  // Filter friends based on search term
  const filteredFriends = userList.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 max-h-screen p-4 border-r border-gray-500 overflow-y-scroll">
      <input
        type="text"
        placeholder="Search Friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border bg-transparent text-xs border-gray-300 text-white p-1 rounded mb-4 focus:outline-none"
      />

      {loading ? (
        <Loader />
      ) : (
        <ul className="space-y-4">
          {filteredFriends.map((friend, index) => (
            <li
              key={index}
              onClick={() => onSelectFriend(friend)} 
              className="flex items-center p-1 bg-transparent rounded hover:bg-purple-900 cursor-pointer relative"
            >
              <div className="relative">
                <img
                  src={friend.profileImage || "https://via.placeholder.com/40"}
                  alt={`${friend.name}'s profile`}
                  className="w-10 h-10 rounded-full border-2 border-gray-600 mr-2"
                />
                {friend.isActive && (
                  <span className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                )}
              </div>
              <div className="flex-1">
                <span className="block text-sm">{friend.name}</span>
                <span className="block text-xxs text-gray-400">new msg</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
