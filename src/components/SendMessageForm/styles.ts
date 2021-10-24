import { StyleSheet } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 184,
    backgroundColor: COLORS.BLACK_TERTIARY,
    paddingBottom: getBottomSpace() + 14,
    paddingTop: 14,
    paddingHorizontal: 12,
  },
  input: {
    width: "100%",
    height: 110,
    textAlignVertical: "top",
    color: COLORS.WHITE,
  },
});
