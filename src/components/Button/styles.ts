import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 25,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    textTransform: "uppercase",
  },
});
