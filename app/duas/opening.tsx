// file: app/duas/opening.tsx
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
الحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ. اللَّهُمَّ إِنِّي أَبْرَأُ مِنْ حَوْلِي وَقُوَّتِي إِلَى حَوْلِكَ وَقُوَّتِكَ. اللَّهُمَّ إِنِّي أَتَقَرَّبُ إِلَيْكَ بِالصَّلَاةِ عَلَى سَيِّدِنَا مُحَمَّدٍ، عَبْدِكَ وَنَبِيِّكَ وَرَسُولِكَ سَيِّدِ الْمُرْسَلِينَ، صَلَّى اللَّهُ تَعَالَى وَسَلَّمَ عَلَيْهِ وَعَلَيْهِمْ أَجْمَعِينَ، امْتِثَالًا لِأَمْرِكَ وَتَصْدِيقًا لَهُ وَمَحَبَّةً فِيهِ وَشَوْقًا إِلَيْهِ وَتَعْظِيمًا لِقَدْرِهِ، وَلِكَوْنِهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَهْلًا لِذَالِكَ، فَتَقَبَّلْهَا مِتَّي بِفَضْلِكَ، وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ، وَوَفِقْنِي لِقِرَاءَتِهَا عَلَى الدَّوَامِ بِجَاهِهِ عِنْدَكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَآلِهِ وَصَحْبِهِ أَجْمَعِينَ.

أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (3)

سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ (3)

حَسْبِيَ اللَّهُ وَنِعْمَ الْوَكِيلُ (3)

أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ.
قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُنْ لَهُ كُفُوْا أَحَدٌ (3)

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿4﴾ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ . مِن شَرِّ مَا خَلَقَ . وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ . وَمِن شَرِّ النَّقْثِ فِي الْعُقَدِ . وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿5﴾

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿6﴾ قُلْ أَعُوذُ بِرَبِّ النَّاسِ . مَلِكِ النَّاسِ . إِلَهِ النَّاسِ . مِن شَرِّ الْوَسْواسِ الْخَنَّاسِ . الَّذِي يُوسُوسُ فِي صُدُورِ النَّاسِ . مِنَ الْجِنَّةِ وَالنَّاسِ ﴿7﴾

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿8﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَلَمِينَ . الرَّحْمَنِ الرَّحِيمِ . مَلِكِ يُؤْمِنِ الدِّينِ . إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينِ . اهْدِنَا الصَّرَاطَ الْمُسْتَقِيمَ . صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الصَّالِحِينَ ﴿9﴾

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿10﴾ الَّذِينَ يُؤْمِنُونَ بِمَا بِالْعَيْبِ وَيَقِيمُونَ الصَّلَوَةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ . وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ . أُولَٰئِكَ عَلَى هُدًى مِن رَّبِّهِمْ ﴿11﴾ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ﴿12﴾

﴿ لَقَدْ جَاءَكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ عَزِيزٌ عَلَيْهِ مَا عَنِّتُمْ حَرِيمٌ صَلَّى اللَّهُ لَا إِلَهَ إِلَّا هُوَ بِالْمُؤْمِنِينَ رَءُوفٌ رَّحِيمٌ ﴾ فَإِن تَوَلَّوْا فَقُلْ حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوْ ﴿ مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ ﴾ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ مِّنْ رَجَالِكُمْ وَلَكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ﴿ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا ﴾ يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ وَلَا تَجْهَرُوا لَهُ بِالْقَوْلِ كَجَهْرِ بَعْضِكُمْ لِبَعْضٍ أَنْ تَحْبَطَ أَعْمَالُكُمْ وَأَنْتُمْ لَا تَشْعُرُونَ ﴿

﴿ إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا ﴾

اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ أَفْضَلَ صَلَوَاتِكَ، وَأَسْعَدَ سَلَامِكَ، وَعَدَدَ مَعْلُومَاتِكَ، وَبَارِكْ وَسَلِّمْ عَلَيْهِ.`;

const TRANSLATION = `In the Name of Allah, the Most Merciful, the Most Compassionate. 
All praise belongs to Allah, Lord of all the worlds. Allah is sufficient for me, and He is the best Disposer of affairs. There is no power and no strength except with Allah, the Most High, the Most Great. O Allah, I declare that I have no power or strength of my own, and I turn to Your power and strength alone. O Allah, I draw near to You by sending blessings upon our master Muhammad, Your servant, Your Prophet, and Your Messenger, the leader of all messengers. May Allah's peace and blessings be upon him and upon them all. I do this in obedience to Your command, in affirmation of him, out of love for him, longing for him, and honoring his noble status, for he is truly deserving of that. So accept this from me by Your grace, make me among Your righteous servants, and grant me the ability to recite it constantly through his honored rank with You. And may Allah send blessings upon our master Muhammad, and upon his family and companions, all of them.
I seek forgiveness from Allah, the Most Great (3 times).
Glory be to Allah, all praise is for Allah, there is no god except Allah, Allah is the Greatest, and there is no power nor strength except with Allah, the Most High, the Most Great (3 times).
Allah is sufficient for me, and He is the best Disposer of affairs (3 times).
I seek refuge in Allah from the accursed Shaytān. 
In the Name of Allah, the Most Merciful, the Most Compassionate. 
Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. And there is none equal to Him. (3 times)
In Name of Allah, the Most Merciful, the Most Compassionate. 
Say: I seek refuge in the Lord of daybreak, from the evil of what He has created, and from the evil of the darkness when it settles, and from the evil of those who blow on knots, and from the evil of an envier when he envies.
In the Name of Allah, the Most Compassionate. 
Say: I seek refuge in the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the hearts of mankind, from among jinn and mankind.
In the Name of Allah, the Most Merciful, the Most Compassionate. 
All praise belongs to Allah, Lord of all the worlds, the Most Merciful, the Most Compassionate, Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path the path of those whom You have blessed, not of those who earned Your anger, nor of those who went astray.
In the Name of Allah, the Most Merciful, the Most Compassionate.
Alif, Lam, Meem. This is the Book in which there is no doubt, a guidance for the righteous those who believe in the unseen, establish prayer, and spend from what We have provided for them; and those who believe in what has been revealed to you and what was revealed before you, and they have certainty in the Hereafter. They are upon guidance from their Lord, and they are the successful.
Indeed, there has come to you a Messenger from among yourselves; it grieves him that you suffer, he is concerned over you, and to the believers he is kind and merciful. But if they turn away, then say: Allah is sufficient for me; there is no god except Him. Upon Him I rely, and He is the Lord of the Mighty Throne.
Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets, and Allah is Knowing of all things.
O you who believe, do not raise your voices above the voice of the Prophet, nor speak loudly to him as you speak loudly to one another, lest your deeds become worthless while you do not realize.
“Indeed, Allah and His angels send blessings upon the Prophet. O you who believe, send blessings upon him and greet him with peace.”
“O Allah, send Your most excellent blessings upon our master Muhammad, and Your most joyful peace, as numerous as Your knowledge encompasses. And bless him and grant him peace.”`;

export default function Opening() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Opening Dua</Text>
          <Text style={styles.headerSub}>Before You Begin · Step 2</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.arabicTitle}>
          اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
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
          onPress={() => router.push("/names")}
        >
          <Text style={styles.nextText}>Continue · The Names of Allah</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.surface} />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>The Names</Text>

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
            <Text style={styles.namesHonorific}>جَلَّ جَلَالُهُ</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textFaint}
          />
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
            <Text style={styles.namesHonorific}>
              صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textFaint}
          />
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
  namesCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  namesIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  namesIconText: { fontSize: 20, color: Colors.primary },
  namesBody: { flex: 1 },
  namesCount: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textFaint,
    letterSpacing: 0.6,
  },
  namesTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 2,
  },
  namesHonorific: {
    fontFamily: "Amiri-Bold",
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 4,
  },
});
