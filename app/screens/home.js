import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "./home/chat";
import Community from "./home/community";
import Status from "./home/status";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Header from "../components/Header";

const TopTab = createMaterialTopTabNavigator();

export default function Home() {
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
        <TopTab.Screen name="Status" component={Status} />
      </TopTab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    display: "none",
  },
});
