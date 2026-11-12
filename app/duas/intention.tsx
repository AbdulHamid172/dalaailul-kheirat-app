// file: app/duas/intention.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";

const ARABIC = `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ

اللَّهُمَّ إِنِّي نَوَيْتُ بِالصَّلَاةِ عَلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِمْتِثَالًا لِأَمْرِكَ، وَتَصْدِيقًا لَنَبِيِّكَ سَيِّدِنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ، وَسَلَّمَ، وَمَحَبَّةً فِيهِ، وَشَوْقًا إِلَيْهِ، وَتَعْظِيمًا لِقَدْرِهِ، وَلِكَوْنِهِ أَهْلًا لِذَلِكَ. فَتَقَبَّلَهَا مِثْيَ بِفَضْلِكَ وَإِحْسَانِكَ، وَأَزْلُ حِجَابَ الْغَفْلَةِ عَنْ قَلْبِي، وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ.

اللَّهُمَ زِدْهُ شَرَفًا عَلَى شَرَفِهِ الَّذِي أَوْلَيْتُهُ، وَعِزًا عَلَى عِزَّهِ الَّذِي أَعْطَيْتُهُ، وَنُورًا عَلَى نُورِهِ الَّذِي مِنْهُ خَلْقَتُهُ، وَارْفَعْ مَقَامَهُ فِي مَقَامَاتِ الْمُرْسَلِينَ، وَدَرَجَتْهُ فِي دَرَجَاتِ النَّبِيِّينَ.

وَأَسْأَلُكَ رِضَاكَ وَرِضَاهُ يَا رَبَّ الْعَالَمِينَ، مَعَ الْعَافِيَةِ الدَّائِمَةِ، وَالْمَوْتِ عَلَى الْكِتَابِ وَالسُّنَّةِ وَالْجَمَاعَةِ، وَكَلِمَةَ الشَّهَادَةِ عَلَى تَحْقِيقِهَا مِنْ غَيْرِ تَبْدِيلٍ وَلَا تَغْيِيرٍ.

وَاغْفِرْ لِي مَا ارْتَكَبْتُهُ بِفَضْلِكَ وَجُودِكَ وَكَرَمِكَ، يَا أَرْحَمَ الرَّاحِمِينَ. وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ خَاتِمِ النَّبِيِّينَ وَإِمَامِ الْمُرْسَلِينَ، وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ، وَسَلَّمَ تَسْلِيمًا. وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.`;

const TRANSLATION = `In the Name of Allah, the Most Merciful, the Most Compassionate.

O Allah, I intend by sending blessings upon the Prophet ﷺ to fulfill Your command, to affirm Your Prophet our master Muhammad ﷺ out of love for him, longing for him, and honoring his noble status, as he is truly deserving of that. So accept it from me through Your grace and kindness, remove the veil of heedlessness from my heart, and make me among Your righteous servants.

O Allah, increase him in honor upon the honor You have already granted him, and in dignity upon the dignity You have given him, and in light upon the light from which You created him. Raise his rank among the stations of the messengers, and elevate his degree among the (levels) of the prophets.

And I ask You for Your pleasure and his pleasure, O Lord of the worlds, along with lasting well-being, and to grant me death upon the Book, the Sunnah, and the true community, and upon the word of faith in its true realization, without any change or alteration.

And forgive me for what I have committed, through Your grace, generosity, and kindness, O Most Merciful of those who show mercy. And may Allah send blessings upon our master Muhammad, the Seal of the Prophets and the leader of the messengers, and upon his family and companions, all of them, and grant them perfect peace. 
All praise belongs to Allah, Lord of all the worlds.`;

export default function Intention() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Dua of Intention</Text>
          <Text style={styles.headerSub}>Niyyah · Before You Begin</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.arabicTitle}>
          نِيَّةُ الصَّلَاةِ عَلَى النَّبِيِّ ﷺ
        </Text>

        <View style={styles.card}>
          <Text style={styles.arabic}>{ARABIC}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Translation</Text>
        <View style={styles.card}>
          <Text style={styles.translation}>{TRANSLATION}</Text>
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push("/duas/opening")}
        >
          <Text style={styles.nextText}>Continue to Opening Dua</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.surface} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  scroll: { flex: 1 },
  content: { padding: 20 },
  arabicTitle: {
    fontFamily: "Amiri-Bold",
    fontSize: 24,
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  arabic: {
    fontFamily: "Amiri",
    fontSize: 24,
    lineHeight: 46,
    color: Colors.text,
    textAlign: "right",
    writingDirection: "rtl",
  },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 24 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  translation: { fontSize: 15, lineHeight: 26, color: Colors.textSoft },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  nextText: { color: Colors.surface, fontSize: 15, fontWeight: "600" },
});
