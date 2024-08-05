import { StyleSheet } from "react-native";
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
import { API_URL } from "@env";

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
    user,
    accessToken,
    messages,
  } = useStore();

  useEffect(() => {
    const socket = io(API_URL, {
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
      console.log(`Marking messages from ${senderId} as seen by ${user._id}`);
    });

    socket.on("user_updated", (updatedUser) => {
      if (user._id === updatedUser._id) {
        setUser(updatedUser);
      } else {
        updateFriend(updatedUser);
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
