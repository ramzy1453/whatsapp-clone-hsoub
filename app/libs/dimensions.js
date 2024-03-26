import { Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

export function width(percent) {
  return (dimensions.width * percent) / 100;
}
export function height(percent) {
  return (dimensions.height * percent) / 100;
}

export function totalSize(num) {
  return (
    (Math.sqrt(dimensions.height ** 2 + dimensions.width ** 2) * num) / 100
  );
}
