import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import FriendList from "../Components/FriendList";
import Topnav from "../Components/Topnav";
import MessageRoom from "../Components/MessageRoom";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState(null);
  

  useEffect(() => {
    // Redirect to login if user is null and loading is complete
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loader />;
  }

  // Only render the dashboard when user data is fully loaded
  if (!user) {
    return null; // Show nothing if user data isn’t loaded yet
  }

  

  return (
    <div className="min-h-screen flex">
      {/* Pass user to FriendList only after user data is loaded */}
      <FriendList user={user}  onSelectFriend = {setSelectedFriend}/> 

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
      
      {selectedFriend !== undefined && <Topnav selectedFriend={selectedFriend} />}

        {/* Message Area */}
        <MessageRoom  selectedFriend = {selectedFriend}/>
      </div>
    </div>
  );
};

export default Dashboard;
