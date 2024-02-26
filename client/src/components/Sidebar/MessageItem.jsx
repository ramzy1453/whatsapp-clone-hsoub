import { useNavigate } from "react-router-dom";
import { useStore } from "../../libs/zustand";

const MessageItem = ({
  sender,
  timestamp,
  selected,
  profilePicture,
  setActifMessage,
  setCurrentReceiver,
  id,
}) => {
  const navigate = useNavigate();
  const { socket } = useStore();

  const onClick = () => {
    setActifMessage();
    setCurrentReceiver();
    navigate(`/${id}`);
    socket?.emit("seen", id);
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 cursor-pointer ${
        selected ? "bg-[#2A3942]" : "hover:bg-[#202C33]"
      }`}
    >
      {/* Icône de l'utilisateur */}
      <img
        src={profilePicture}
        alt="profilePicture"
        className="w-10 h-10 rounded-full mr-4"
      />

      {/* Contenu du message */}
      <div>
        <p className="text-white font-semibold">{sender}</p>
        <p className="text-white text-sm">{"Dernier Message"}</p>
      </div>

      {/* Horodatage du message */}
      <div className="ml-auto text-gray-400">
        <p>{timestamp}</p>
      </div>
    </div>
  );
};

export default MessageItem;
