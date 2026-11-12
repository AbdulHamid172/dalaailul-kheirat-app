// file: app/settings.tsx
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { getFontSize, setFontSize } from "../../utils/storage";

export default function Settings() {
  const [currentSize, setCurrentSize] = useState<"sm" | "md" | "lg" | "xl">(
    "md",
  );

  useEffect(() => {
    (async () => {
      const size = await getFontSize();
      setCurrentSize(size);
    })();
  }, []);

  const handleSizeChange = async (size: "sm" | "md" | "lg" | "xl") => {
    setCurrentSize(size);
    await setFontSize(size);
  };

  const handleWhatsApp = () => {
    const phone = "+254115405261";
    const url = `whatsapp://send?phone=${phone}&text=Assalamu%20alaikum%20Abdul%20Hamid`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            "WhatsApp not installed",
            "Please install WhatsApp to contact us.",
          );
        }
      })
      .catch(() => Alert.alert("Error", "Could not open WhatsApp."));
  };

  const sizeOptions = [
    { label: "S", value: "sm" as const },
    { label: "M", value: "md" as const },
    { label: "L", value: "lg" as const },
    { label: "XL", value: "xl" as const },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Preferences</Text>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Arabic Font Size</Text>
            <View style={styles.sizeRow}>
              {sizeOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.sizeBtn,
                    currentSize === opt.value && styles.sizeBtnActive,
                  ]}
                  onPress={() => handleSizeChange(opt.value)}
                >
                  <Text
                    style={[
                      styles.sizeBtnText,
                      currentSize === opt.value && styles.sizeBtnTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>
              Dalāʾil al-Khayrāt is a timeless manual of blessings upon the
              Prophet Muhammad ﷺ, composed by Imam al-Jazuli in 15th-century
              Morocco.
            </Text>
            <Text style={styles.aboutText}>
              This app is dedicated as Ṣadaqah Jāriyah (ongoing charity) for the
              soul of Ismail Ahmed.
            </Text>
            <Text style={styles.aboutAr}>إسماعيل أحمد</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Support</Text>
          <TouchableOpacity style={styles.contactBtn} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.contactText}>
              <Text style={styles.contactTitle}>Contact Abdul Hamid</Text>
              <Text style={styles.contactSub}>via WhatsApp</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textFaint}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dalāʾil al-Khayrāt App</Text>
          <Text style={styles.footerVersion}>Version 1.0.0</Text>
          <Text style={styles.footerMade}>
            Built with love for the Prophet ﷺ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 20 },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 24,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  sizeRow: { flexDirection: "row", gap: 10 },
  sizeBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sizeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sizeBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  sizeBtnTextActive: { color: Colors.surface },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSoft,
    marginBottom: 8,
  },
  aboutAr: {
    fontFamily: "Amiri-Bold",
    fontSize: 24,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 12,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  contactText: { flex: 1 },
  contactTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },
  contactSub: { fontSize: 12, color: Colors.textMuted },
  footer: { alignItems: "center", marginTop: 24, marginBottom: 40 },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  footerVersion: { fontSize: 12, color: Colors.textFaint, marginBottom: 4 },
  footerMade: {
    fontSize: 12,
    color: Colors.textFaint,
    fontStyle: "italic",
  },
});
