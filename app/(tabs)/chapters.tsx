// file: app/(tabs)/chapters.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChapterCard from "../../components/ChapterCard";
import Colors from "../../constants/Colors";
import chaptersData from "../../data/chapters.json";
import { getCompletedChapters } from "../../utils/storage";

type Chapter = {
  id: number;
  day_number: number;
  title_en: string;
  title_ar: string;
  description: string;
};

export default function Chapters() {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const todayJs = new Date().getDay();
  const todayNum = todayJs === 0 ? 7 : todayJs;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const done = await getCompletedChapters();
        if (mounted) setCompleted(Array.isArray(done) ? done : []);
      } catch (err) {
        console.warn("Failed to load completed chapters", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const safeChapters: Chapter[] = Array.isArray(chaptersData)
    ? (chaptersData as Chapter[]).filter(
        (c) => c && typeof c.id === "number" && c.id <= 8,
      )
    : [];

  const rawda = Array.isArray(chaptersData)
    ? (chaptersData as Chapter[]).find((c) => c.id === 9)
    : undefined;

  const isToday = (dayNumber: number) => {
    if (dayNumber >= 1 && dayNumber <= 7) {
      return dayNumber === todayNum;
    }
    if (dayNumber === 8) {
      if (todayNum !== 1) return false;
      return [1, 2, 3, 4, 5, 6, 7].every((d) => {
        const ch = safeChapters.find((c) => c.day_number === d);
        return ch ? completed.includes(ch.id) : false;
      });
    }
    return false;
  };

  // The "next up" day is the first not-yet-completed day.
  const nextDayNumber = (() => {
    for (let n = 1; n <= 8; n++) {
      const ch = safeChapters.find((c) => c.day_number === n);
      if (!ch) continue;
      if (!completed.includes(ch.id)) return n;
    }
    return null;
  })();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroAr}>دلائل الخيرات</Text>
          <Text style={styles.heroEn}>The Eight Days</Text>
          <Text style={styles.heroTag}>
            One part per day · Monday through the following Monday
          </Text>
        </View>

        <View style={styles.summaryBar}>
          <Text style={styles.summaryText}>
            <Text style={styles.summaryStrong}>{completed.length}</Text>
            {" of "}
            <Text style={styles.summaryStrong}>{safeChapters.length}</Text>
            {" days complete"}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={Colors.primary} size="large" />
          </View>
        ) : safeChapters.length === 0 ? (
          <View style={styles.loadingWrap}>
            <Text style={{ color: Colors.textMuted }}>
              No chapters found. Check data/chapters.json.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {safeChapters.map((ch) => {
              const done = completed.includes(ch.id);
              const isNext = !done && ch.day_number === nextDayNumber;
              return (
                <ChapterCard
                  key={ch.id}
                  dayNumber={ch.day_number}
                  titleEn={ch.title_en}
                  titleAr={ch.title_ar}
                  description={ch.description}
                  completed={done}
                  isToday={isToday(ch.day_number) || isNext}
                  onPress={() => router.push(`/reader/${ch.id}`)}
                />
              );
            })}
          </View>
        )}

        <View style={styles.note}>
          <Text style={styles.noteText}>
            💡 The cycle is continuous. When you finish Part 8 on Monday, you
            may immediately begin Part 1 again.
          </Text>
        </View>

        {rawda ? (
          <View style={styles.alsoSection}>
            <Text style={styles.alsoLabel}>ALSO IN THIS BOOK</Text>
            <ChapterCard
              dayNumber={9}
              titleEn={rawda.title_en}
              titleAr={rawda.title_ar}
              description={rawda.description}
              completed={completed.includes(rawda.id)}
              onPress={() => router.push(`/reader/${rawda.id}`)}
            />
          </View>
        ) : null}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8 },
  hero: {
    paddingVertical: 28,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  heroAr: {
    fontFamily: "Amiri-Bold",
    fontSize: 34,
    color: Colors.primary,
    lineHeight: 46,
    textAlign: "center",
  },
  heroEn: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textMuted,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  heroTag: {
    fontSize: 12.5,
    color: Colors.textFaint,
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  summaryBar: {
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
  },
  summaryStrong: {
    fontWeight: "700",
    color: Colors.primary,
    fontSize: 14,
  },
  loadingWrap: {
    paddingVertical: 40,
    alignItems: "center",
  },
  grid: { width: "100%" },
  note: {
    marginTop: 12,
    padding: 14,
    backgroundColor: Colors.surface2,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.borderHi,
  },
  noteText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: Colors.textMuted,
  },
  alsoSection: {
    marginTop: 20,
  },
  alsoLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 1.2,
    marginBottom: 8,
    paddingLeft: 4,
  },
});
