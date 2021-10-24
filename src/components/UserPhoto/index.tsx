import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import avatarImg from "../../assets/avatar.png";
import { COLORS } from "../../theme";
const SIZES = {
  SMALL: {
    conteinerSize: 32,
    avatarSize: 28,
  },
  NORMAL: {
    conteinerSize: 48,
    avatarSize: 42,
  },
};
type Props = {
  imageUri: string | undefined;
  sizes?: "SMALL" | "NORMAL";
};
const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri, sizes = "NORMAL" }: Props) {
  const { avatarSize, conteinerSize } = SIZES[sizes];
  return (
    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.container,
        {
          width: conteinerSize,
          height: conteinerSize,
          borderRadius: conteinerSize / 2,
        },
      ]}
    >
      <Image
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
        source={{ uri: imageUri || AVATAR_DEFAULT }}
      />
    </LinearGradient>
  );
}
