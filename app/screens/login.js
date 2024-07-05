import { StyleSheet, Image, View, KeyboardAvoidingView } from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Toast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../libs/requests";
import { useStore } from "../libs/globalState";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect } from "react";

export default function Login() {
  const navigation = useNavigation();
  const { setAccessToken, setUser, user, accessToken } = useStore();

  useEffect(() => {
    if (user && accessToken !== "") {
      navigation.navigate("Home");
    }
  }, [user, accessToken]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
  });

  const onSubmit = async () => {
    const errors = Object.values(formik.errors);
    if (errors.length > 0) {
      Toast.show({
        title: errors.join("\n"),
        status: "error",
        backgroundColor: "#ff5252",
        placement: "top",
      });
    } else {
      const response = await login(formik.values.email, formik.values.password);

      if (response.error) {
        Toast.show({
          title: response.error,
          status: "error",
          backgroundColor: "#ff5252",
          placement: "top",
        });
        return;
      }

      Toast.show({
        title: response.message,
        status: "success",
        backgroundColor: "#0e806a",
        placement: "top",
      });
      setUser(response.user);
      setAccessToken(response.accessToken);
      navigation.navigate("Home");
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Box safeArea w="90%" maxW="290">
        <Image
          source={require("../assets/images/hsoub.png")}
          style={styles.logo}
        />
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Login to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
            />
          </FormControl>
          <Button mt="2" color="#0e806a" onPress={onSubmit}>
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              I'm a new user.
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Register
            </Link>
          </HStack>
        </VStack>
      </Box>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 72,
  },
  logo: {
    transform: [{ scale: 0.5 }],
    alignSelf: "center",
  },
});
