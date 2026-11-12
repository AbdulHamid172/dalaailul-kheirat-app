// file: app/names.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import allahNames from "../data/names_of_allah.json";
import prophetNames from "../data/names_of_prophet.json";

type NameEntry = {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
};

type Tab = "allah" | "prophet";

export default function Names() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>(
    params.tab === "prophet" ? "prophet" : "allah",
  );
  const [search, setSearch] = useState("");

  const source: NameEntry[] =
    tab === "allah"
      ? (allahNames as NameEntry[])
      : (prophetNames as NameEntry[]);

  const filtered = source.filter((n) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      n.arabic.includes(search) ||
      n.transliteration.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q) ||
      String(n.number) === search
    );
  });

  const tabTitleAllah = "99 Names of Allah · جَلَّ جَلَالُهُ";
  const tabTitleProphet = "Names of the Prophet ﷺ";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>The Names</Text>
          <Text style={styles.headerSub}>
            Asmāʾ Allāh al-Ḥusnā · Asmāʾ al-Nabī ﷺ
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, tab === "allah" && styles.tabActive]}
          onPress={() => setTab("allah")}
        >
          <Text
            style={[styles.tabText, tab === "allah" && styles.tabTextActive]}
          >
            {tabTitleAllah}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "prophet" && styles.tabActive]}
          onPress={() => setTab("prophet")}
        >
          <Text
            style={[styles.tabText, tab === "prophet" && styles.tabTextActive]}
          >
            {tabTitleProphet}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by number, Arabic, or meaning…"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={Colors.textFaint}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionHeadLabel}>
          {tab === "allah" ? "ALLAH'S MOST BEAUTIFUL NAMES" : "THE PROPHET'S NAMES"}
        </Text>
        <Text style={styles.sectionHeadHonorific}>
          {tab === "allah"
            ? "جَلَّ جَلَالُهُ"
            : "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ"}
        </Text>
      </View>

      <Text style={styles.count}>
        {filtered.length} of {source.length} names
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.number)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.nameCard}>
            <View style={styles.nameRow}>
              <View style={styles.nameLeft}>
                <Text style={styles.nameNum}>{item.number}</Text>
                <Text style={styles.nameTranslit}>{item.transliteration}</Text>
                <Text style={styles.nameMeaning}>{item.meaning}</Text>
              </View>
              <View style={styles.nameRight}>
                <Text style={styles.nameArabic}>{item.arabic}</Text>
                <Text style={styles.nameHonorific}>
                  {tab === "allah"
                    ? "جَلَّ جَلَالُهُ"
                    : "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ"}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No names match your search.</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.85}
            onPress={() =>
              tab === "allah"
                ? router.push("/names?tab=prophet")
                : router.push("/reader/1")
            }
          >
            <Text style={styles.continueText}>
              {tab === "allah"
                ? "Continue · Names of the Prophet ﷺ"
                : "Continue · Begin Day 1"}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={Colors.surface}
            />
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 12,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 16, fontWeight: "600", color: Colors.primary },
  headerSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  tabRow: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    backgroundColor: Colors.surface2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  tabTextActive: { color: Colors.surface },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    padding: 0,
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  sectionHeadLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  sectionHeadHonorific: {
    fontFamily: "Amiri-Bold",
    fontSize: 16,
    color: Colors.secondary,
  },
  count: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  nameCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  nameLeft: { flex: 1 },
  nameNum: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 1,
    marginBottom: 4,
  },
  nameTranslit: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },
  nameMeaning: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  nameRight: { alignItems: "flex-end" },
  nameArabic: {
    fontFamily: "Amiri-Bold",
    fontSize: 26,
    color: Colors.primary,
    writingDirection: "rtl",
    textAlign: "right",
  },
  nameHonorific: {
    fontFamily: "Amiri",
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 4,
    writingDirection: "rtl",
  },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: Colors.textMuted, fontSize: 14 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    marginHorizontal: 16,
  },
  continueText: {
    color: Colors.surface,
    fontSize: 15,
    fontWeight: "600",
  },
});
