import React from "react";
import logoHsoub from "../../assets/hsoub.png";

export default function NoUserSelected() {
  return (
    <div className="flex-[3] flex flex-col justify-center items-center space-y-8 bg-[#0B141A]">
      <div>
        <img src={logoHsoub} alt="logo" className="w-64" />
      </div>
      <div>
        <h1 className="text-white text-3xl">Welcome to Chat App</h1>
      </div>
    </div>
  );
}
