import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

type Props = {
  dayNumber: number;
  titleEn: string;
  titleAr: string;
  description?: string;
  completed?: boolean;
  isToday?: boolean;
  onPress: () => void;
};

export default function ChapterCard({
  dayNumber,
  titleEn,
  titleAr,
  description,
  completed = false,
  isToday = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isToday && styles.cardToday,
        completed && styles.cardDone,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Completion badge (top right) */}
      {completed && (
        <View style={styles.checkBadge}>
          <Ionicons name="checkmark" size={14} color={Colors.success} />
        </View>
      )}

      {/* Today dot (top left) */}
      {isToday && !completed && (
        <View style={styles.todayDot} />
      )}

      {/* Day number in Arabic */}
      <Text style={styles.dayNumberAr}>{dayNumber}</Text>

      {/* Day label */}
      <Text style={styles.dayLabel}>
        DAY {dayNumber}
        {isToday ? ' · TODAY' : ''}
      </Text>

      {/* English title */}
      <Text style={styles.titleEn} numberOfLines={2}>
        {titleEn}
      </Text>

      {/* Arabic title (small, subtle) */}
      <Text style={styles.titleAr} numberOfLines={1}>
        {titleAr}
      </Text>

      {/* Description */}
      {description ? (
        <Text style={styles.desc} numberOfLines={3}>
          {description}
        </Text>
      ) : null}

      {/* Bottom arrow */}
      <View style={styles.arrowRow}>
        <Text style={styles.arrowText}>{completed ? 'Re-read' : 'Open'}</Text>
        <Ionicons name="arrow-forward" size={14} color={Colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardPressed: {
    backgroundColor: Colors.surface2,
    transform: [{ scale: 0.985 }],
  },
  cardToday: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    backgroundColor: Colors.surface2,
  },
  cardDone: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.successBg,
    borderWidth: 1,
    borderColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayDot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  dayNumberAr: {
    fontFamily: 'Amiri-Bold',
    fontSize: 32,
    color: Colors.primary,
    lineHeight: 38,
    marginBottom: 2,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: Colors.textFaint,
    marginBottom: 6,
  },
  titleEn: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  titleAr: {
    fontFamily: 'Amiri',
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'left',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12.5,
    color: Colors.textMuted,
    lineHeight: 17,
    marginBottom: 10,
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  arrowText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});