// file: app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // Base height without system inset; add insets.bottom on top.
  // On gesture-nav phones insets.bottom ≈ 0.
  // On 3-button-nav phones insets.bottom ≈ 48 → the tab bar sits above them.
  const BASE_HEIGHT = 62;
  const BASE_PAD_TOP = 6;
  const BASE_PAD_BOTTOM = 6;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textFaint,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingTop: BASE_PAD_TOP,
          paddingBottom: BASE_PAD_BOTTOM + insets.bottom,
          height: BASE_HEIGHT + insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="chapters"
        options={{
          title: "Chapters",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
