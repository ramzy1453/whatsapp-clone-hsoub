import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import EditableInput from "./EditableInput";
import { useStore } from "../../libs/globalState";
import { updateUser } from "../../libs/requests";

export default function Profile({ onClose }) {
  const { user } = useStore();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [status, setStatus] = useState(user.status);
  const [image, setImage] = useState(null);

  const handleProfilePictureChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));

      const formData = new FormData();
      formData.append(
        "profilePicture",
        e.target.files[0],
        e.target.files[0].name
      );

      await updateUser(formData);
    }
  };

  return (
    <div className="flex-[1] bg-[#131B20] border-r border-[#a7a8a82f] h-screen">
      <div className="flex space-x-4 items-center bg-[#222C32] p-4 h-16">
        <button
          className="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all"
          onClick={onClose}
        >
          <IoMdReturnLeft
            size={24}
            color="#B0BAC0"
            className="cursor-pointer"
          />
        </button>
        <p className="text-white text-lg">Profile</p>
      </div>
      <div className="px-4 space-y-4">
        <div className="">
          <div className="flex items-center justify-center py-7 select-none">
            <div class="relative w-[200px] h-[200px]">
              <img
                src={image || user.profilePicture}
                alt="Avatar"
                className="w-full h-full rounded-full transition-opacity duration-300"
              />
              <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div class="text-white flex flex-col items-center justify-center mx-2">
                  <FaCamera size={24} color="#B0BAC0" />
                  <p className="text-center">Change the profile picture</p>
                </div>
                <input
                  type="file"
                  onChange={handleProfilePictureChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <EditableInput
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="Your firstname"
            id="firstName"
          />
          <EditableInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Your lastname"
            id="lastName"
          />
          <EditableInput
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            id="status"
            placeholder="Set a status..."
          />
        </form>
      </div>
    </div>
  );
}
