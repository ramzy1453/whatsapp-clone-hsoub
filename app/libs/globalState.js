import { create } from "zustand";
import { chataData } from "./chatdata";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create((set) => ({
  socket: null,
  accessToken: "",
  user: null,
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

  setUser: async (user) => {
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    return set({ user });
  },
  setAccessToken: async (accessToken) => {
    if (accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
    }
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
  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    set({ user: null, accessToken: null });
  },
}));
