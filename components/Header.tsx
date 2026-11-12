import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
};

export default function Header({ title, subtitle, showBack = true, rightAction }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
        </View>

        <View style={styles.right}>{rightAction || null}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: Colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
    minHeight: 60,
  },
  left: { width: 44, alignItems: 'flex-start' },
  center: { flex: 1, alignItems: 'center' },
  right: { width: 44, alignItems: 'flex-end' },
  backBtn: { padding: 4 },
  title: { fontSize: 17, fontWeight: '600', color: Colors.primary },
  subtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
});