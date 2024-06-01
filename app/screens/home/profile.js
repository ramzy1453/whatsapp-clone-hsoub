import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useStore } from "../../libs/globalState";
import { Button } from "native-base";
import EditUserModal from "../../components/Profile/EditUserModal";

export default function Profile() {
  const { user } = useStore();
  const { lastName, firstName, email, profilePicture: pp, status } = user;
  const actualStatus = status || "No status";
  const profilePicture = pp.replace("localhost", "192.168.1.8");
  console.log(profilePicture);

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <EditUserModal modalVisible={modalVisible} closeModal={closeModal} />
      <View style={styles.imageContainer}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
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
    </View>
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
