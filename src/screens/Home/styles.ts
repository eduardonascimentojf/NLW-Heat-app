import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
export const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingTop: getStatusBarHeight() + 15,
  },
  text: {
    fontFamily: FONTS.BOLD,
    color: "white",
  },
});
