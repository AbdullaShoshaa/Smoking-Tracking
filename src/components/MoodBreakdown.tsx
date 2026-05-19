import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MoodCount } from '../types';
import { getMoodOption } from '../constants/moods';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface Props {
  data: MoodCount[];
}

export default function MoodBreakdown({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Breakdown</Text>
      {data.map(item => {
        const option = getMoodOption(item.mood);
        const pct = Math.round((item.count / total) * 100);
        const barColor = Colors.moodColors[item.mood] ?? Colors.primary;

        return (
          <View key={item.mood} style={styles.row}>
            <Text style={styles.emoji}>{option.emoji}</Text>
            <View style={styles.barContainer}>
              <View style={styles.barRow}>
                <Text style={styles.moodLabel}>{option.label}</Text>
                <Text style={styles.count}>{item.count}x  {pct}%</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct}%`, backgroundColor: barColor }]} />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  emoji: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  barContainer: {
    flex: 1,
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodLabel: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  count: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  track: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: 6,
    borderRadius: Radius.full,
  },
});
