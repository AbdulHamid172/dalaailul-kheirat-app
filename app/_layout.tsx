// file: app/_layout.tsx
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Amiri: require("../assets/fonts/Amiri-Regular.ttf"),
    "Amiri-Bold": require("../assets/fonts/Amiri-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="names" />
        <Stack.Screen name="reader/[id]" />
        <Stack.Screen name="duas/intention" />
        <Stack.Screen name="duas/opening" />
        <Stack.Screen name="duas/completion" />
      </Stack>
    </SafeAreaProvider>
  );
}
