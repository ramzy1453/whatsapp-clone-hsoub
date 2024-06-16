import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import EditUserModal from "../../components/Profile/EditUserModal";
import { useStore } from "../../libs/globalState";
import { uploadImage } from "../../libs/requests";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Profile() {
  const { user, accessToken } = useStore();
  const { lastName, firstName, email, profilePicture: pp, status } = user;
  const actualStatus = status || "No status";
  const profilePicture = pp.replace("localhost", "192.168.1.8");

  console.log("change occured", profilePicture);

  // Stores the selected image URI
  const [file, setFile] = useState(profilePicture);

  // Stores any error message
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to pick an image from
  //the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
                   roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable

        const localUri = result.assets[0].uri;

        setFile(localUri);

        const response = await uploadImage(accessToken, localUri);

        // Clear any previous errors
        setError(null);
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <EditUserModal modalVisible={modalVisible} closeModal={closeModal} />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage}>
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
          onPress={openModal}
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
