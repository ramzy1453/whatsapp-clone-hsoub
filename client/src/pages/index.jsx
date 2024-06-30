import io from "socket.io-client";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useStore } from "../libs/globalState";
import { getMessages, getUsers } from "../libs/requests";

export default function Home() {
  const {
    addMessage,
    setFriends,
    setSocket,
    setMessages,
    setUser,
    updateFriend,
    setTyping,
    addFriend,
    setCurrentReceiver,
    user,
    accessToken,
    currentReceiver,
    messages,
  } = useStore();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL, {
      query: "token=" + accessToken,
    });
    socket.on("receive_message", (message) => {
      addMessage(message);
    });

    socket.on("typing", () => {
      setTyping(true);
    });

    socket.on("stop_typing", () => {
      setTyping(false);
    });

    socket.on("seen", (senderId) => {
      console.log("Seen", senderId);
    });

    socket.on("user_updated", (updatedUser) => {
      if (user._id === updatedUser._id) {
        setUser(updatedUser);
      } else {
        updateFriend(updatedUser);
        if (currentReceiver?._id === updatedUser._id) {
          setCurrentReceiver(updatedUser);
        }
      }
    });

    socket.on("user_created", (userCreated) => {
      if (userCreated._id !== user._id) {
        addFriend(userCreated);
      }
    });

    setSocket(socket);

    const fetchData = async () => {
      const users = await getUsers(accessToken);
      const messages = await getMessages(accessToken);

      setFriends(users);
      setMessages(messages);
    };
    fetchData();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}
