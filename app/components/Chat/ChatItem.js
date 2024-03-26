import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function ChatItem({
  id,
  firstName,
  lastName,
  lastMessage,
  profilePicture,
  createdAt,
}) {
  const navigate = useNavigation();
  const totalUnread = parseInt(Math.random() * 4);
  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate("Messages", {
          id,
          firstName,
          lastName,
          profilePicture,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <Image
            source={require("../../assets/images/jerusalem.jpeg")}
            style={styles.image}
          />
          <View style={styles.chatContent}>
            <Text>
              {firstName} {lastName}
            </Text>
            <Text>{lastMessage}</Text>
          </View>
        </View>
        <View style={styles.unreadMessageContainer}>
          <Text>{moment(createdAt).format("hh:mm A")}</Text>
          {totalUnread > 0 && (
            <View style={styles.totalUnread}>
              <Text style={{ color: "white" }}>{totalUnread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  chatContent: {
    marginLeft: 16,
  },
  unreadMessageContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalUnread: {
    backgroundColor: "#0e806a",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});
