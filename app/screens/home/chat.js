import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { chataData } from "../../libs/chatdata";
import ChatItem from "../../components/Chat/ChatItem";

export default function Chat() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chataData}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => <ChatItem {...item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
