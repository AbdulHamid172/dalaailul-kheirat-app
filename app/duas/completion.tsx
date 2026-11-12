// file: app/duas/completion.tsx
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

const ARABIC = `اللَّهُمَّ اشْرَحْ بِالصَّلَاةِ عَلَيْهِ صُدُورَنَا ، وَيَسِّرْ بِهَا أُمُورَنَا ، وَفَرِّجْ بِهَا هُمُومَنَا، وَاكْشِفَ بِهَا غُمُومَنَا، وَاغْفِرْ بِهَا ذُنُوبَنَا، وَاقْضِ بِهَا دُيُونَنَا، وَأَصْلِحْ بِهَا أَحْوَالَنَا ، وَبَلِّغْ بِهَا آمَالَنَا، وَتَقَبَّلْ بِهَا تَوْبَتَنَا، وَاغْسِلْ بِهَا حَوْبَتَنَا، وَانْصُرْ بِهَا حُجَّتَنَا، وَطَهِّرْ بِهَا أَلْسِنَتَنَا، وَآنِسُ بِهَا وَحْشَتَنَا، وَارْحَمْ بِهَا غُرْبَتَنَا، وَاجْعَلْهَا نُورًا بَيْنَ أَيْدِينَا، وَمِنْ خَلْفِنَا، وَعَنْ اَيْمَانِنا، وَعَنْ شَمَائِلِنَا، وَمِنْ فَوْقِنَا، وَمِنْ تَحْتِنَا، وَفِي حَيَاتِنَا، وَمَوْتِنَا، وَفِي قُبُورِنَا، وَحَشْرِنَا، وَنَشْرِنَا، وَظِلًّا فِي يَوْمِ الْقِيَامَةِ عَلَى رُؤُوسِنَا، وَثَقِّلْ بِهَا مَوَازِينَ حَسَنَاتِنَا، وَأَدِمْ بَرَكَاتِهَا عَلَيْنَا حَتَّى نَلْقَى نَبِيَّنَا وَسَيِّدَنَا مُحَمَّدًا صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَنَحْنُ آمِنُونَ مُطْمَئِنُّونَ فَرِحُونَ مُسْتَبْشِرُونَ، وَلَا تُفَرِّقُ بَيْنَنَا وَبَيْنَهُ حَتَّى تُدْخِلَنَا مُدْخَلَهُ، وَتُؤْوِيَنَا إِلَى جِوَارِهِ الْكَرِيمِ مَعَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ مِّنَ النَّبِيِّنَ وَالصِّدِّيقِين وَالشُّهَدَاءِ وَالصَّالِحِينَ وَحَسُنَ أُوْلَئِكَ رَفِيقًا.

اللَّهُمَّ إِنَّا آمَنَّا بِهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَلَمْ نَرَهُ، فَمَتِّعْنَا اللَّهُمَّ فِي الدَّارَيْنِ بِرُؤْيَتِهِ، وَثَبِّتْ قُلُوبَنَا عَلَى مَحَبَّتِهِ، وَاسْتَعْمِلْنَا عَلَى سُنَّتِهِ، وَتَوَفَّنَا عَلَى مِلَّتِهِ وَاحْشُرْنَا فِي زُمْرَتِهِ النَّاجِيَةِ وَحِزْبِهِ الْمُفْلِحِينَ، وَانْفَعْنَا بِمَا انْطَوَتْ عَلَيْهِ قُلُوبُنَا مِنْ مَحَبَّتِهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَوْمَ لَا جَدَّ وَلَا مَالَ وَلَا بَنِينَ، وَأَوْرِدْنَا حَوْضَهُ الْأَصْفَى، وَاسْقِنَا بِكَأْسِهِ الْأَوْفَى، وَيَسِّرْ عَلَيْنَا زِيَارَةَ حَرَمِكَ وَحَرَمِهِ مِنْ قَبْلِ أَنْ تُمِيتَنَا، وَأَدِمْ عَلَيْنَا الْإِقَامَةَ بِحَرَمِكَ وَحَرَمِهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِلَى أَنْ تُتَوَفَّى.

اللَّهُمَّ إِنَّا نَسْتَشْفِعُ بِهِ إِلَيْكَ إِذْ هُوَ أَوْجَهُ الشُّفَعَاءِ إِلَيْكَ، وَنُقْسِمُ بِهِ عَلَيْكَ إِذْ هُوَ أَعْظَمُ مَنْ أُقْسِمَ بِحَقِّهِ عَلَيْكَ، وَنَتَوَسَّلُ بِهِ إِلَيْكَ إِذْ هُوَ أَقْرَبُ الوَسَائِلِ إِلَيْكَ، نَشْكُو إِلَيْكَ يَا رَبِّ قَسْوَةَ قُلُوبِنَا، وَكَثْرَةَ ذُنُوبِنَا، وَطُولَ آمَالِنَا، وَتَكَاسُلَنَا عَنِ الطَّاعَاتِ، وَهُجُومَنَا عَلَى المُخَالَفَاتِ، فَنِعْمَ المُشْتَكَى إِلَيْهِ أَنْتَ يَا رَبِّ، بِكَ نَسْتَنْصِرُ عَلَى أَعْدَائِنَا وَأَنْفُسِنَا فَانْصُرْنَا، وَعَلَى فَضْلِكَ نَتَوَكَّلُ فِي صَالَحِنَا، فَلَا تَكِلْنَا إِلَى غَيْرِكَ يَا رَبَّنَا، وَإِلَى جَنَابِ رَسُولِكَ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَنْتَسِبُ فَلَا تُبَعِدْنَا، وَبِبَابِكَ نَقِفُ فَلَا تَطْرُدْنَا، وَإِيَّاكَ نَسْأَلُ فَلَا تُخَيِّبْنَا.

اللَّهُمَّ ارْحَمْ تَضَرُّعَنَا، وَآمِنْ خَوْفَنَا، وَتَقَبَّلْ أَعْمَالَنَا، وَأَصْلِحْ أَحْوَالَنَا، وَاجْعَلْ بِطَاعَتِكَ اشْتِغَالَنَا، وَإِلَى الْخَيْرِ مَالَنَا، وَحَقِّقُ بِالزِّيَادَةِ آمَالَنَا، وَاخْتِمُ بِالسَّعَادَةِ آجَالَنَا. هَذَا ذُلُّنَا ظَاهِرٌ بَيْنَ يَدَيْكَ، وَحَالُنَا لَا يَخْفَى عَلَيْكَ، أَمَرْتَنَا فَتَرَكْنَا، وَنَهَيْتَنَا فَارْتَكَيْنَا، وَلَا يَسَعُنَا إِلَّا عَفْوُكَ فَاعْفُ عَنَّا يَا خَيْرَ مَأْمُولٍ، وَأَكْرَمَ مَسْئُولٍ، إِنَّكَ عَفُوٌّ غَفُورٌ رَّؤُوفٌ رَّحِيمٌ يَا أَرْحَمَ الرَّاحِمِينَ. وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ تَسْلِيمًا، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِين.`;

const TRANSLATION = `O Allah, by sending blessings upon him, expand our chests, and ease by it our affairs, and relieve by it our worries, and remove by it our distresses, and forgive by it our sins, and settle by it our debts, and rectify by it our conditions, and convey by it our hopes, and accept by it our repentance, and wash by it our faults, and support by it our proof, and purify by it our tongues, and bring intimacy by it to our loneliness, and have mercy by it upon our estrangement.
And make it a light before us, and behind us, and on our right, and on our left, and above us, and beneath us, and in our life, and our death, and in our graves, and our gathering, and our spreading forth (resurrection), and a shade on the Day of Resurrection over our heads.
And make heavy by it the scales of our good deeds, and continue its blessings upon us until we meet our Prophet and our Master Muhammad (peace and blessings be upon him) while we are secure, at peace, joyful, and rejoicing.
And do not separate between us and him until You admit us to his entrance, and grant us refuge to his noble proximity among those whom You have favored from the Prophets, the truthful, the martyrs, and the righteous—and excellent are those as companions.
O Allah, indeed we have believed in him (peace and blessings be upon him) and we have not seen him, so grant us enjoyment, O Allah, in both abodes (world and Hereafter) by seeing him.
And make firm our hearts upon his love, and employ us upon his Sunnah, and cause us to die upon his religion, and gather us in his saved group and his successful party.
And benefit us by what our hearts contain of his love (peace and blessings be upon him) on a Day when there will be no possession, nor wealth, nor children.
And bring us to his most pure Pond, and give us to drink from his fullest cup, and make easy for us the visitation of Your sanctuary and his sanctuary before You cause us to die, and make lasting upon us residence in Your sanctuary and his sanctuary.
May Allah send blessings and peace upon him continuously until You cause us to pass away.
O Allah, we seek his intercession through him to You, for he is the most honored of intercessors before You. We swear by him before You, for he is the greatest of those by whose right an oath is made to You. We take him as a means to You, for he is the nearest of means to You. We complain to You, O Lord, of the hardness of our hearts, the abundance of our sins, the length of our hopes, our laziness in acts of obedience, and our rushing toward acts of disobedience. You are the best One to complain to, O Lord. Through You we seek victory over our enemies and our own selves, so grant us victory. Upon Your grace we rely for our rectification, so do not leave us to anyone besides You, O our Lord. To the rank of Your Messenger we belong, so do not distance us. At Your door we stand, so do not turn us away. You alone we ask, so do not deprive us.
O Allah, have mercy on our humble pleading, grant us safety from our fears, accept our deeds, rectify our conditions, make us occupied in Your obedience, incline us toward goodness, fulfill our hopes with increase, and end our lives with happiness. This is our humility laid open before You, and our state is not hidden from You. You commanded us, yet we abandoned; You forbade us, yet we committed. Nothing suffices us except Your pardon, so pardon us, O Best of those hoped for and Most Generous of those asked. Indeed, You are Most Pardoning, Most Forgiving, Most Kind, Most Merciful, O Most Merciful of the merciful. And may Allah send blessings upon our Master Muhammad, and upon his family and companions, and grant them peace. And all praise belongs to Allah, Lord of all the worlds.`;

export default function Completion() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Dua of Completion</Text>
          <Text style={styles.headerSub}>After Finishing · The Closing</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.arabicTitle}>دُعَاءُ الْخِتَامِ</Text>

        <View style={[styles.card, styles.completionCard]}>
          <Text style={styles.arabic}>{ARABIC}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Translation</Text>
        <View style={styles.card}>
          <Text style={styles.translation}>{TRANSLATION}</Text>
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push("/")}
        >
          <Text style={styles.nextText}>Restart the Cycle</Text>
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
  completionCard: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },
  arabic: {
    fontFamily: "Amiri",
    fontSize: 22,
    lineHeight: 42,
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
