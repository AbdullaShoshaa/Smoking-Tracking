import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Entry } from '../types';
import { getMoodOption } from '../constants/moods';
import { Colors, FontSize, Spacing } from '../constants/theme';

interface Props {
  entry: Entry;
}

export default function HistoryEntry({ entry }: Props) {
  const mood = getMoodOption(entry.mood);
  const time = format(parseISO(entry.logged_at), 'h:mm a');

  return (
    <View style={styles.row}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.emoji}>{mood.emoji}</Text>
      <View style={styles.middle}>
        <Text style={styles.moodLabel}>{mood.label}</Text>
        {entry.note ? (
          <Text style={styles.note} numberOfLines={2}>{entry.note}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  time: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    width: 64,
    paddingTop: 2,
  },
  emoji: {
    fontSize: 20,
  },
  middle: {
    flex: 1,
    gap: 2,
  },
  moodLabel: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  note: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
