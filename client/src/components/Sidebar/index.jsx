import { useEffect, useState } from "react";
import { FaUserFriends, FaCommentAlt, FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import MessageItem from "./MessageItem";
import Profile from "../Profile";
import { useStore } from "../../libs/zustand";
import { getUsers } from "../../libs/requests";
import Loading from "../Loading";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { user, setCurrentReceiver, friends, messages } = useStore();

  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);

  const [actifMessage, setActifMessage] = useState(receiverId);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = ({ lastName, firstName }) => {
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(query.toLowerCase().trim());
  };

  if (showProfile) {
    return <Profile onClose={() => setShowProfile(false)} />;
  }

  return (
    <div className="flex-[1] bg-[#131B20] border-r border-[#a7a8a82f] h-full overflow-y-scroll">
      <div className="flex items-center justify-between bg-[#222C32] p-3 h-16">
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={user.profilePicture}
          alt="Avatar"
          onClick={() => setShowProfile(true)}
        />
        <div className="flex space-x-6">
          <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
            <FaUserFriends
              size={16}
              color="#B0BAC0"
              className="cursor-pointer"
            />
          </button>
          <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
            <FaCommentAlt
              size={16}
              color="#B0BAC0"
              className="cursor-pointer"
            />
          </button>
          <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
            <IoMdSettings
              size={16}
              color="#B0BAC0"
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="p-3 flex justify-between items-center space-x-3">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search your contacts..."
            className="w-full py-2 pl-10 pr-4 text-white bg-[#222C32] rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          />
          <FaSearch className="absolute top-0 left-0 mt-3 ml-3 text-gray-400" />
        </div>
        <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
          <IoFilter size={16} color="#B0BAC0" className="cursor-pointer" />
        </button>
      </div>
      <div>
        {friends ? (
          friends
            .filter(handleSearch)
            .map((friend) => (
              <MessageItem
                key={friend._id}
                id={friend._id}
                sender={`${friend.firstName} ${friend.lastName}`}
                timestamp="12:00"
                selected={friend._id === actifMessage}
                profilePicture={friend.profilePicture}
                setActifMessage={() => setActifMessage(friend._id)}
                setCurrentReceiver={() => setCurrentReceiver(friend)}
              />
            ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
