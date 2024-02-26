import { FaSearch } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useStore } from "../../libs/zustand";

const ChatHeader = () => {
  const { currentReceiver, setAccessToken, setUser, typing } = useStore();
  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  if (!currentReceiver) return null;
  return (
    <div className="flex items-center bg-[#222C32] justify-between h-16 p-3">
      <div className="flex items-center space-x-3">
        <img
          src={currentReceiver.profilePicture}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-white text-md font-semibold">{`${currentReceiver.firstName} ${currentReceiver.lastName}`}</p>
          <p className="text-[#B0BAC0] text-xs">
            {typing ? "typing..." : currentReceiver.status}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
          <FaSearch size={16} color="#B0BAC0" className="cursor-pointer" />
        </button>
        <button class="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
          <IoLogOutOutline
            onClick={handleLogout}
            size={20}
            color="#B0BAC0"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
