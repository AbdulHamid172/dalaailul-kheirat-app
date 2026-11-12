// file: app/index.tsx
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
import chaptersData from "../../data/chapters.json";
import {
  getBookmarks,
  getCompletedChapters,
  getLastRead,
} from "../../utils/storage";

type Chapter = {
  id: number;
  day_number: number;
  title_en: string;
  title_ar: string;
  description: string;
};

export default function Home() {
  const router = useRouter();
  const [lastRead, setLastRead] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        try {
          const lr = await getLastRead();
          const comp = await getCompletedChapters();
          const bm = await getBookmarks();
          if (mounted) {
            setLastRead(lr);
            setCompletedCount(comp.length);
            setBookmarkCount(bm.length);
          }
        } catch (e) {
          console.warn(e);
        }
      })();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const handleContinue = () => {
    // No saved progress → start the guided recitation at the very beginning.
    if (!lastRead) {
      router.push("/duas/intention");
      return;
    }
    // Otherwise resume at the saved day.
    router.push(`/reader/${lastRead}`);
  };

  const handleStartFromBeginning = () => {
    router.push("/duas/intention");
  };

  const allChapters: Chapter[] = Array.isArray(chaptersData)
    ? (chaptersData as Chapter[])
    : [];

  const chapters = allChapters.filter((c) => c.id <= 8);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.titleAr}>دلائل الخيرات</Text>
          <Text style={styles.titleEn}>Dalāʾil al-Khayrāt</Text>
          <Text style={styles.subtitle}>
            Waymarks of Benefits · Guide to Goodness
          </Text>
          <View style={styles.blessingBox}>
            <Text style={styles.blessingAr}>
              صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
            </Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introText}>
            A timeless manual of blessings upon the Prophet Muhammad ﷺ, composed
            by Imam al-Jazuli in 15th-century Morocco and recited across the
            Islamic world for over five centuries.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryBtnText}>
              {lastRead
                ? `Continue Reading (Day ${lastRead})`
                : "Begin the Recitation"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push("/chapters")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryBtnText}>Browse All Chapters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.startOverBtn}
            onPress={handleStartFromBeginning}
            activeOpacity={0.7}
          >
            <Text style={styles.startOverText}>
              Start from the Beginning · Intention
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{completedCount}/8</Text>
            <Text style={styles.statLabel}>Days Read</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{bookmarkCount}</Text>
            <Text style={styles.statLabel}>Bookmarks</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Begin Here · The Starting Duas</Text>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => router.push("/duas/intention")}
          activeOpacity={0.8}
        >
          <Text style={styles.featureLabel}>BEFORE YOU BEGIN · STEP 1</Text>
          <Text style={styles.featureTitle}>Dua of Intention (Niyyah)</Text>
          <Text style={styles.featureDesc}>
            Make your intention to recite the Dalāʾil for the sake of Allah and
            out of love for His Prophet ﷺ.
          </Text>
          <Text style={styles.featureCta}>Begin with intention →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => router.push("/duas/opening")}
          activeOpacity={0.8}
        >
          <Text style={styles.featureLabel}>BEFORE YOU BEGIN · STEP 2</Text>
          <Text style={styles.featureTitle}>Opening Dua</Text>
          <Text style={styles.featureDesc}>
            The opening supplication — with the recitation of Sūrat al-Ikhlāṣ,
            al-Falaq, al-Nās, al-Fātiḥah, and other verses.
          </Text>
          <Text style={styles.featureCta}>Open the supplication →</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>The Names</Text>

        <View style={styles.namesGrid}>
          <TouchableOpacity
            style={styles.namesCard}
            onPress={() => router.push("/names")}
            activeOpacity={0.8}
          >
            <View style={styles.namesIcon}>
              <Text style={styles.namesIconText}>✦</Text>
            </View>
            <View style={styles.namesBody}>
              <Text style={styles.namesCount}>99 NAMES</Text>
              <Text style={styles.namesTitle}>Asmāʾ Allāh al-Ḥusnā</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.namesCard}
            onPress={() => router.push("/names")}
            activeOpacity={0.8}
          >
            <View style={styles.namesIcon}>
              <Text style={styles.namesIconText}>ﷺ</Text>
            </View>
            <View style={styles.namesBody}>
              <Text style={styles.namesCount}>201 NAMES</Text>
              <Text style={styles.namesTitle}>Asmāʾ al-Nabī ﷺ</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>The Eight Days</Text>

        <View style={styles.daysGrid}>
          {chapters.map((ch) => {
            const todayJs = new Date().getDay();
            const todayNum = todayJs === 0 ? 7 : todayJs;
            const isToday = ch.day_number === todayNum;
            return (
              <TouchableOpacity
                key={ch.id}
                style={[styles.dayCard, isToday && styles.dayCardToday]}
                onPress={() => router.push(`/reader/${ch.id}`)}
                activeOpacity={0.8}
              >
                <Text style={styles.dayName}>
                  DAY {ch.day_number}
                  {isToday ? " · TODAY" : ""}
                </Text>
                <Text style={styles.dayAr}>{ch.title_ar}</Text>
                <Text style={styles.dayEn}>{ch.title_en}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>The Blessed Rawda</Text>
        <TouchableOpacity
          style={[styles.featureCard, styles.rawdaCard]}
          onPress={() => router.push("/reader/9")}
          activeOpacity={0.8}
        >
          <Text style={styles.featureLabel}>THE NOBLE GARDEN</Text>
          <Text style={styles.featureTitle}>The Description of the Rawda</Text>
          <Text style={styles.featureDesc}>
            The location of the blessed grave of the Prophet ﷺ and his two
            companions, Abu Bakr and Umar (may Allah be pleased with them).
          </Text>
          <Text style={styles.featureCta}>Read the description →</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>When You Complete the Cycle</Text>

        <TouchableOpacity
          style={[styles.featureCard, styles.completionCard]}
          onPress={() => router.push("/duas/completion")}
          activeOpacity={0.8}
        >
          <Text style={styles.featureLabel}>AFTER FINISHING · THE CLOSING</Text>
          <Text style={[styles.featureTitle, { color: Colors.success }]}>
            Dua of Completion
          </Text>
          <Text style={[styles.featureDesc, { color: "#4a7351" }]}>
            Recited upon completing the entire Dalāʾil — asking Allah to accept
            the recitation and to bless the Prophet ﷺ and the reader.
          </Text>
          <Text style={[styles.featureCta, { color: Colors.success }]}>
            Read the closing dua →
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  hero: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  titleAr: {
    fontFamily: "Amiri-Bold",
    fontSize: 38,
    color: Colors.primary,
    lineHeight: 52,
    textAlign: "center",
  },
  titleEn: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textMuted,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textFaint,
    textAlign: "center",
    marginTop: 6,
    fontStyle: "italic",
  },
  blessingBox: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    width: "100%",
    alignItems: "center",
  },
  blessingAr: {
    fontFamily: "Amiri",
    fontSize: 20,
    color: Colors.secondary,
    textAlign: "center",
  },
  intro: { paddingHorizontal: 8, marginBottom: 24 },
  introText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSoft,
    textAlign: "center",
  },
  actions: { gap: 12, marginBottom: 24 },
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: Colors.surface, fontSize: 16, fontWeight: "600" },
  secondaryBtn: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryBtnText: { color: Colors.primary, fontSize: 16, fontWeight: "600" },
  startOverBtn: {
    paddingVertical: 10,
    alignItems: "center",
  },
  startOverText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textMuted,
    textDecorationLine: "underline",
  },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  statVal: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 24,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rawdaCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  featureLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 1,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  featureCta: { fontSize: 13, fontWeight: "600", color: Colors.primary },
  namesGrid: { flexDirection: "row", gap: 12, marginBottom: 8 },
  namesCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  namesIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  namesIconText: { fontSize: 18, color: Colors.primary },
  namesBody: { flex: 1 },
  namesCount: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 0.5,
  },
  namesTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 2,
  },
  daysGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  dayCard: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  dayCardToday: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    backgroundColor: Colors.surface2,
  },
  dayName: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dayAr: {
    fontFamily: "Amiri-Bold",
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 2,
  },
  dayEn: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: "center",
  },
  completionCard: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },
});
