import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "./chat";
import Community from "./community";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Header from "../../components/Header";
import { useStore } from "../../libs/globalState";
import { useEffect } from "react";
import io from "socket.io-client";
import { getMessages, getUsers } from "../../libs/requests";
import Profile from "./profile";

console.log({ expoApi: process.env.EXPO_PUBLIC_API_URL });
const backendUrl = "http://192.168.1.8:8000" || "http://192.168.1.8:8000";

const TopTab = createMaterialTopTabNavigator();

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
    const socket = io(backendUrl, {
      query: "token=" + accessToken,
    });

    socket.on("receive_message", (message) => {
      console.log("Received message", message);
      addMessage(message);
    });

    socket.on("typing", () => {
      setTyping(true);
    });

    socket.on("stop_typing", () => {
      setTyping(false);
    });

    socket.on("seen", (senderId) => {
      setMessages(senderId);
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

      console.log(users.length, messages.length);

      setFriends(users);
      setMessages(messages);
    };
    fetchData();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {}, [messages]);

  return (
    <>
      <Header />
      <TopTab.Navigator
        initialRouteName="Chat"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: "#0e806a",
          },
        }}
      >
        <TopTab.Screen
          name="Community"
          component={Community}
          options={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <TopTab.Screen name="Chat" component={Chat} />
        <TopTab.Screen name="Profile" component={Profile} />
      </TopTab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    display: "none",
  },
});
