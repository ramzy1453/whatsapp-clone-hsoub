import { useEffect, useRef } from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import { useStore } from "../../libs/zustand";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const messagesContainerRef = useRef(null);
  const { messages, user } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (messagesContainerRef) {
      messagesContainerRef.current.addEventListener(
        "DOMNodeInserted",
        (event) => {
          const { currentTarget } = event;
          currentTarget.scroll({
            top: currentTarget.scrollHeight,
            behavior: "smooth",
          });
        }
      );
    }
  }, []);

  return (
    <div className="flex-[3] flex flex-col">
      <ChatHeader />
      <div
        className="px-8 py-6 flex-1 space-y-2 bg-[#0B141A] overflow-y-scroll h-8"
        ref={messagesContainerRef}
      >
        {messages?.map((message, i) => (
          <ChatMessage
            key={i}
            {...message}
            isSender={user._id === message.senderId}
          />
        ))}
      </div>
      <ChatFooter />
    </div>
  );
}
