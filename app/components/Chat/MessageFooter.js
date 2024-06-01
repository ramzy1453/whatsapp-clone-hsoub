import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStore } from "../../libs/globalState";

export default function MessageFooter({ scrollToEnd, receiverId }) {
  const [input, setInput] = useState("");
  const { socket, accessToken } = useStore();

  const sendMessage = () => {
    socket.emit("send_message", {
      accessToken,
      receiverId,
      content: input,
    });
    setInput("");
    scrollToEnd();
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <Icon
          name="send"
          backgroundColor="#0e806a"
          color="white"
          size={20}
          onPress={sendMessage}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0e806a",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    outlineStyle: "none",
  },
  button: {
    elevation: 3,
    borderWidth: 1,
    padding: 6,
    borderColor: "white",
  },
});
