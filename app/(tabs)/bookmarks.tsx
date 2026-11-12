// file: app/bookmarks.tsx
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import passagesData from "../../data/passages";
import { getBookmarks, toggleBookmark } from "../../utils/storage";

type Passage = {
  id: number;
  chapter_id: number;
  title_en: string;
  arabic_text: string;
  translation?: string;
};

export default function Bookmarks() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        try {
          const bm = await getBookmarks();
          if (mounted) setBookmarks(bm);
        } catch (e) {
          console.warn(e);
        }
      })();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const handleRemove = async (id: number) => {
    const updated = await toggleBookmark(id);
    setBookmarks(updated);
  };

  const bookmarkedPassages = (passagesData as Passage[]).filter((p) =>
    bookmarks.includes(p.id),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Bookmarks</Text>
          <Text style={styles.pageSub}>
            {bookmarks.length} saved passage{bookmarks.length === 1 ? "" : "s"}
          </Text>
        </View>

        {bookmarks.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="star-outline" size={48} color={Colors.textFaint} />
            <Text style={styles.emptyTitle}>No bookmarks yet</Text>
            <Text style={styles.emptyText}>
              Tap the star icon on any passage in the reader to save it here.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push("/chapters")}
            >
              <Text style={styles.emptyBtnText}>Browse Chapters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          bookmarkedPassages.map((p) => (
            <View key={p.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTag}>Day {p.chapter_id}</Text>
                <TouchableOpacity onPress={() => handleRemove(p.id)}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={Colors.error}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.arabicText} numberOfLines={3}>
                {p.arabic_text}
              </Text>
              {p.translation && (
                <Text style={styles.translationText} numberOfLines={2}>
                  {p.translation}
                </Text>
              )}
              <TouchableOpacity
                style={styles.openBtn}
                onPress={() => router.push(`/reader/${p.chapter_id}`)}
              >
                <Text style={styles.openBtnText}>Open in Reader</Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { marginBottom: 20 },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  pageSub: { fontSize: 13, color: Colors.textMuted },
  empty: { alignItems: "center", paddingVertical: 60 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyBtnText: { color: Colors.surface, fontSize: 15, fontWeight: "600" },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTag: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  arabicText: {
    fontFamily: "Amiri",
    fontSize: 20,
    lineHeight: 36,
    color: Colors.text,
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 8,
  },
  translationText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontStyle: "italic",
    lineHeight: 20,
    marginBottom: 12,
  },
  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  openBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
});
