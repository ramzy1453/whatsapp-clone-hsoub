import { TbSend } from "react-icons/tb";
import { useStore } from "../../libs/globalState";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ChatFooter() {
  const { input, setInput, socket } = useStore();
  const { pathname: receiverId } = useLocation();

  const sendMessage = () => {
    if (input) {
      socket.emit("send_message", {
        receiverId: receiverId.slice(1),
        content: input,
      });
      setInput("");
    }
  };
  useEffect(() => {
    if (socket && input) {
      socket.emit("typing", receiverId.slice(1));
    } else {
      socket.emit("stop_typing", receiverId.slice(1));
    }
  }, [input, socket, receiverId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center bg-[#202C33] shadow-xl py-2 px-3 space-x-2">
        <textarea
          id="chat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="1"
          className="block w-full text-sm bg-[#2A3942] px-3 py-2 resize-none outline-none text-white rounded-md"
          placeholder="Your message..."
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          className="justify-center rounded-full p-1 cursor-pointer active:bg-[#005C4B] transition-all"
          onClick={sendMessage}
        >
          <TbSend size={24} color="white" />
        </button>
      </div>
    </>
  );
}
