import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { useStore } from "../../libs/globalState";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Profile() {
  const { user, accessToken } = useStore();
  const { lastName, firstName, email, profilePicture, status } = user;
  const actualStatus = status || "No status";

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image source={{ uri: file }} style={styles.profilePicture} />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.label}>Status</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.text}>{actualStatus}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          bg="#0e806a"
          _hover={{
            bg: "green.700",
          }}
        >
          Edit Profile
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  imageContainer: {
    alignItems: "center",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 1000,
  },
  subContainer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  labelContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },

  label: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
