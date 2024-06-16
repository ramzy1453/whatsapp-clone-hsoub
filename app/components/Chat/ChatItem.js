import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { getReceiverMessages } from "../../libs/filterMessages";
import { useStore } from "../../libs/globalState";

export default function ChatItem({
  _id,
  firstName,
  lastName,
  profilePicture,
  createdAt,
}) {
  const navigation = useNavigation();
  const { messages } = useStore();

  const contactMessages = getReceiverMessages(messages, _id);
  const lastMessage = contactMessages[contactMessages.length - 1];

  const totalUnread = contactMessages.filter(
    (message) => !message.seen && message.receiverId !== _id
  ).length;

  console.log(profilePicture);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Messages", {
          _id,
          firstName,
          lastName,
          profilePicture,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <Image source={{ uri: profilePicture }} style={styles.image} />
          <View style={styles.chatContent}>
            <Text>
              {firstName} {lastName}
            </Text>
            <Text
              style={[
                styles.lastMessage,
                {
                  color: !lastMessage ? "#9e9e9e" : "black",
                },
              ]}
            >
              {lastMessage?.content || "Start the discussion..."}
            </Text>
          </View>
        </View>
        <View style={styles.unreadMessageContainer}>
          <Text>{moment(createdAt).format("hh:mm A")}</Text>
          {totalUnread > 0 && (
            <View style={styles.totalUnread}>
              <Text style={{ color: "white" }}>
                {totalUnread < 9 ? totalUnread : "+9"}
              </Text>
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
    flex: 1,
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
    flex: 1,
  },
  totalUnread: {
    backgroundColor: "#0e806a",
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  lastMessage: {
    color: "#9e9e9e",
    width: 200,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});
