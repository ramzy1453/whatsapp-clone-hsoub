import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useRef } from "react";
import MessageItem from "../../components/Chat/MessageItem";
import MessageFooter from "../../components/Chat/MessageFooter";
import { useStore } from "../../libs/globalState";
import { getReceiverMessages } from "../../libs/filterMessages";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Messages() {
  const { messages, user, socket } = useStore();

  const routes = useRoute();
  const navigation = useNavigation();

  const { _id: receiverId, lastName, firstName } = routes.params;

  const filtredMessages = getReceiverMessages(messages, receiverId);

  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ title: `${firstName} ${lastName}` });
  }, [routes.params.name]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filtredMessages}
        ref={flatListRef}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <MessageItem {...item} isSender={item.senderId === user._id} />
        )}
      />
      <MessageFooter
        receiverId={receiverId}
        scrollToEnd={() => {
          flatListRef.current.scrollToEnd({ animated: true });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
