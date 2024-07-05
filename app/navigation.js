import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Register from "./screens/register";
import Login from "./screens/login";
import Messages from "./screens/home/messages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useStore } from "./libs/globalState";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { setUser, setAccessToken, user, logout, accessToken } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const jsonUser = await AsyncStorage.getItem("user");

      if (token) {
        setAccessToken(token);
      }

      if (jsonUser) {
        setUser(JSON.parse(jsonUser));
      }
    };
    fetchData();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0e806a",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
