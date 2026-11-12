// file: app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textFaint,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 6,
          paddingTop: 6,
          height: 62,
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
