import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useStore } from "../../libs/globalState";

export default function MessageItem({
  _id,
  content,
  createdAt,
  seen,
  isSender,
}) {
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isSender ? "flex-end" : "flex-start",
          backgroundColor: isSender ? "#0e806a" : "#f0f0f0",
          borderWidth: isSender ? 0 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: isSender ? "white" : "black",
          },
        ]}
      >
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "rgba(0,0,0,0.2)",
    margin: 12,
    borderRadius: 10,
    maxWidth: "70%",
  },
  title: {
    fontSize: 18,
    color: "white",
  },
});
