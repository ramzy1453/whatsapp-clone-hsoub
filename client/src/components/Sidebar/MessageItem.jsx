import { useNavigate } from "react-router-dom";
import { useStore } from "../../libs/globalState";
import { getReceiverMessages } from "../../libs/filterMessages";
import moment from "moment";
const MessageItem = ({
  sender,
  selected,
  profilePicture,
  setActifMessage,
  setCurrentReceiver,
  id,
}) => {
  const navigate = useNavigate();
  const { socket, messages, setMessages } = useStore();
  const contactMessages = getReceiverMessages(messages, id);
  console.log(contactMessages);
  const lastMessage = contactMessages[contactMessages.length - 1];

  const unreadMessages = contactMessages.filter(
    (message) => !message.seen && message.receiverId !== id
  ).length;

  const onClick = () => {
    setActifMessage();
    setCurrentReceiver();
    navigate(`/${id}`);
    socket?.emit("seen", id);
    setMessages(messages.map((message) => ({ ...message, seen: true })));
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
          {sender._id === id ? "You: " : ""}{" "}
          {lastMessage?.content || "Start conversation here..."}
        </p>
      </div>
      <div className="ml-auto text-gray-400 flex justify-center items-center space-x-4">
        {unreadMessages > 0 && (
          <div className="bg-[#3B82F6] text-white rounded-full w-5 h-5 flex items-center justify-center">
            {unreadMessages}
          </div>
        )}
        <p>{moment(lastMessage?.createdAt).format("hh:mm A")}</p>
      </div>
    </div>
  );
};

export default MessageItem;
