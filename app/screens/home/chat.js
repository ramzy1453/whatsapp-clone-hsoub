import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ChatItem from "../../components/Chat/ChatItem";
import { useStore } from "../../libs/globalState";

export default function Chat() {
  const { friends } = useStore();
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
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
