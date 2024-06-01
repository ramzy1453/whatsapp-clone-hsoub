import { create } from "zustand";
import { chataData } from "./chatdata";

export const useStore = create((set) => ({
  socket: null,
  accessToken: "",
  user: {},
  friends: chataData,
  typing: null,
  input: "",
  currentReceiver: {},
  messages: [],
  setSocket: (socket) => set({ socket }),
  setTyping: (typing) => set({ typing }),
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) =>
    set(({ friends }) => {
      return { friends: [...friends, friend] };
    }),
  updateFriend: (user) =>
    set(({ friends }) => {
      const index = friends.findIndex((f) => f._id === user._id);
      friends[index] = user;
      return { friends: [...friends] };
    }),

  setUser: (user) => {
    return set({ user });
  },
  setAccessToken: (accessToken) => {
    return set({ accessToken });
  },
  setInput: (input) => set({ input }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => {
    return set(({ messages }) => {
      return { messages: [...messages, message] };
    });
  },
  setCurrentReceiver: (currentReceiver) => {
    return set({ currentReceiver });
  },
}));
