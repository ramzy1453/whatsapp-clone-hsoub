import { View, Text, StyleSheet } from "react-native";
import {
  Feather,
  Fontisto,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>WhatsApp</Text>
        <View style={styles.iconsContainer}>
          <Feather name="camera" color="white" style={styles.icon} size={20} />
          <Fontisto name="search" color="white" style={styles.icon} size={20} />
          <MaterialCommunityIcons
            name="dots-vertical"
            color="white"
            style={styles.icon}
            size={21}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e806a",
    paddingTop: 80,
    paddingBottom: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
    color: "white",
    marginLeft: 20,
  },
});
