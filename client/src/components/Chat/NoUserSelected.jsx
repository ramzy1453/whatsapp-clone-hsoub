import React from "react";
import logoHsoub from "../../assets/hsoub.png";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useStore } from "../../libs/globalState";

export default function NoUserSelected() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useStore();

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col flex-[3]">
      <div className="flex items-center justify-end bg-[#222C32] h-16 p-3">
        <div className="flex space-x-4">
          <button className="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all">
            <IoLogOutOutline
              onClick={handleLogout}
              size={20}
              color="#B0BAC0"
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center items-center space-y-8 bg-[#0B141A]">
        <div>
          <img src={logoHsoub} alt="logo" className="w-64" />
        </div>
        <div>
          <h1 className="text-white text-3xl">Welcome to Chat App</h1>
        </div>
      </div>
    </div>
  );
}
