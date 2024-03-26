import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Community({ navigation }) {
  console.log(navigation);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      />
      <Image
        source={require("../../assets/images/hsoub.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome to Chat App</Text>
      <Button
        title="Go to Chat"
        onPress={() => {
          navigation.navigate("Chat");
        }}
      />
      <View
        style={{
          flex: 3,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    transform: [{ scale: 0.75 }],
  },
  text: {
    fontSize: 32,
    marginVertical: 20,
  },
});
