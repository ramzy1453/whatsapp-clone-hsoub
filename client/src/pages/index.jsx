import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useStore } from "../libs/zustand";
import io from "socket.io-client";
import { getMessages, getUsers } from "../libs/requests";
import { useLocation } from "react-router-dom";

export default function Home() {
  const store = useStore();
  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);

  useEffect(() => {
    const socket = io("http://localhost:8000", {
      query: "token=" + store.accessToken,
    });
    socket.on("receive_message", (message) => {
      store.addMessage(message);
    });

    socket.on("typing", (senderId) => {
      store.setTyping(true);
    });

    socket.on("stop_typing", (senderId) => {
      store.setTyping(false);
    });

    socket.on("seen", (receiverId) => {
      store.setMessages(
        store.messages.map((message) => {
          if (message.receiver === receiverId) {
            return { ...message, seen: true };
          }
          return message;
        })
      );
    });

    socket.on("user_updated", (updatedUser) => {
      if (store.user._id === updatedUser._id) {
        store.setUser(updatedUser);
      } else {
        store.updateFriend(updatedUser);
        if (store.currentReceiver?._id === updatedUser._id) {
          store.setCurrentReceiver(updatedUser);
        }
      }
    });

    socket.on("user_created", (userCreated) => {
      if (userCreated._id !== store.user._id) {
        store.addFriend(userCreated);
      }
    });

    store.setSocket(socket);

    const fetchUsers = async () => {
      const users = await getUsers();
      store.setFriends(users);
    };

    fetchUsers();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(receiverId);
      store.setMessages(
        messages.filter((message) => {
          return (
            message.senderId === receiverId || message.receiverId === receiverId
          );
        })
      );
      store.setLastMessages(messages.map((message) => message.content));
      console.log(
        messages.filter(
          (message) =>
            message.senderId === receiverId || message.receiverId === receiverId
        )[0]
      );
    };

    fetchMessages();
  }, [receiverId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}
