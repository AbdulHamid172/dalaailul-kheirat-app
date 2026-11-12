// file: app/reader/[id].tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import chaptersData from "../../data/chapters.json";
import passagesData from "../../data/passages";
import {
  getBookmarks,
  getFontSize,
  setFontSize as saveFontSize,
  setLastRead,
  toggleBookmark,
} from "../../utils/storage";

type Passage = {
  id: number;
  chapter_id: number;
  section_label: string;
  title_en: string;
  arabic_text: string;
  translation?: string;
};

export default function Reader() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const chapterId = Number(id);

  const [fontSize, setFontSizeState] = useState<number>(28);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const chapter = chaptersData.find((c) => c.id === chapterId);
  const passages = (passagesData as Passage[]).filter(
    (p) => p.chapter_id === chapterId,
  );

  useEffect(() => {
    if (chapterId) setLastRead(chapterId);

    (async () => {
      const savedSize = await getFontSize();
      const sizeMap = { sm: 22, md: 28, lg: 34, xl: 42 };
      setFontSizeState(sizeMap[savedSize]);

      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    })();
  }, [chapterId]);

  const changeFontSize = async (delta: number) => {
    const newSize = fontSize + delta;
    if (newSize >= 18 && newSize <= 50) {
      setFontSizeState(newSize);
      let cat: "sm" | "md" | "lg" | "xl" = "md";
      if (newSize <= 24) cat = "sm";
      else if (newSize <= 30) cat = "md";
      else if (newSize <= 38) cat = "lg";
      else cat = "xl";
      await saveFontSize(cat);
    }
  };

  const handleToggleBookmark = async (passageId: number) => {
    const updated = await toggleBookmark(passageId);
    setBookmarks(updated);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {chapter?.title_en || `Day ${chapterId}`}
          </Text>
          <Text style={styles.headerSub}>{chapterId === 9 ? "The Blessed Rawda" : `Day ${chapterId} of 8`}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => changeFontSize(-2)}
        >
          <Text style={styles.controlText}>A-</Text>
        </TouchableOpacity>
        <Text style={styles.controlLabel}>Font Size</Text>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => changeFontSize(2)}
        >
          <Text style={styles.controlText}>A+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {passages.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No passages found for this day.
            </Text>
          </View>
        ) : (
          passages.map((p, index) => {
            const isBookmarked = bookmarks.includes(p.id);
            return (
              <View key={p.id} style={styles.passageCard}>
                <View style={styles.passageHeader}>
                  <Text style={styles.passageNum}>{index + 1}</Text>
                  <TouchableOpacity onPress={() => handleToggleBookmark(p.id)}>
                    <Ionicons
                      name={isBookmarked ? "star" : "star-outline"}
                      size={22}
                      color={isBookmarked ? Colors.secondary : Colors.textFaint}
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.arabic,
                    { fontSize: fontSize, lineHeight: fontSize * 1.9 },
                  ]}
                >
                  {p.arabic_text}
                </Text>

                {p.translation && (
                  <View style={styles.translationBox}>
                    <Text style={styles.translationText}>{p.translation}</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
        <View style={{ height: 40 }} />

        <TouchableOpacity
          style={styles.continueBtn}
          activeOpacity={0.85}
          onPress={() => {
            if (chapterId >= 1 && chapterId <= 7) {
              router.replace(`/reader/${chapterId + 1}`);
            } else if (chapterId === 8 || chapterId === 9) {
              router.replace("/duas/completion");
            } else {
              router.replace("/");
            }
          }}
        >
          <Text style={styles.continueText}>
            {chapterId >= 1 && chapterId <= 7
              ? `Continue · Day ${chapterId + 1}`
              : chapterId === 8
              ? "Complete the Cycle · Dua of Completion"
              : "Dua of Completion"}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.surface}
          />
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backBtn: { padding: 8, width: 40 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  headerSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  controlBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  controlText: { fontSize: 14, fontWeight: "600", color: Colors.primary },
  controlLabel: { fontSize: 12, color: Colors.textMuted },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  passageCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  passageNum: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textFaint,
    backgroundColor: Colors.surface2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  arabic: {
    fontFamily: "Amiri",
    color: Colors.text,
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 16,
  },
  translationBox: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: Colors.textMuted },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  continueText: {
    color: Colors.surface,
    fontSize: 15,
    fontWeight: "600",
  },
});
