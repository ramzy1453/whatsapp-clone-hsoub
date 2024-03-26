import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  View,
} from "react-native";

import { useFormik } from "formik";
import * as Yup from "yup";
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
import { register } from "../libs/requests";

export default function Register({ navigation }) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  const onSubmit = async () => {
    Keyboard.dismiss();
    const errors = Object.values(formik.errors);
    if (errors.length > 0) {
      Toast.show({
        title: errors.join("\n"),
        status: "error",
        backgroundColor: "#ff5252",
        placement: "top",
      });
    } else {
      const response = await register({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
        confirmPassword: formik.values.confirmPassword,
      });
      console.log(response);
      Toast.show({
        title: "Login successful",
        status: "success",
        backgroundColor: "#0e806a",
        placement: "top",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Box safeArea w="90%" maxW="290">
        <KeyboardAvoidingView>
          <Image
            source={require("../assets/images/hsoub.png")}
            style={styles.logo}
          />
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Welcome
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            Register to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                value={formik.values.firstName}
                onChangeText={formik.handleChange("firstName")}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>last Name</FormControl.Label>
              <Input
                value={formik.values.lastName}
                onChangeText={formik.handleChange("lastName")}
              />
            </FormControl>
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
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange("confirmPassword")}
              />
            </FormControl>
            <Button mt="2" color="#0e806a" onPress={onSubmit}>
              Register
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600">
                Already have an account?
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login
              </Link>
            </HStack>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </View>
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
