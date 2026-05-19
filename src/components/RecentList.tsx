import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Entry } from '../types';
import { getMoodOption } from '../constants/moods';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface Props {
  entries: Entry[];
}

function EntryRow({ item }: { item: Entry }) {
  const mood = getMoodOption(item.mood);
  const time = format(parseISO(item.logged_at), 'h:mm a');

  return (
    <View style={styles.row}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.emoji}>{mood.emoji}</Text>
      <Text style={styles.moodLabel}>{mood.label}</Text>
      {item.note ? (
        <Text style={styles.note} numberOfLines={1}>{item.note}</Text>
      ) : null}
    </View>
  );
}

export default function RecentList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No cigarettes logged today yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <EntryRow item={item} />}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  time: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    width: 60,
  },
  emoji: {
    fontSize: 18,
  },
  moodLabel: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    flex: 1,
  },
  note: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  empty: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
