import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import AppLoading from "expo-app-loading";
import { Home } from "./src/screens/Home";
import { AuthProvaider } from "./src/hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthProvaider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Home />
    </AuthProvaider>
  );
}
