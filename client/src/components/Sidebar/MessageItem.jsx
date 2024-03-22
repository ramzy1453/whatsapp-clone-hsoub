import { useNavigate } from "react-router-dom";
import { useStore } from "../../libs/globalState";
import { getReceiverMessages } from "../../libs/filterMessages";

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
  const { socket, messages } = useStore();
  const contactMessages = getReceiverMessages(messages, id);
  const lastMessage = contactMessages[contactMessages.length - 1];
  console.log(contactMessages);

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
      <img
        src={profilePicture}
        alt="profilePicture"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <p className="text-white font-semibold">{sender}</p>
        <p className="text-white text-sm">
          {lastMessage?.content || "Start conversation here..."}
        </p>
      </div>
      <div className="ml-auto text-gray-400">
        <p>{timestamp}</p>
      </div>
    </div>
  );
};

export default MessageItem;
