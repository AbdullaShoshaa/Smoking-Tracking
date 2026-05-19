import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { format, parseISO } from 'date-fns';
import { getAllEntries } from '@/db/queries';
import { Entry } from '@/types';
import HistoryEntry from '@/components/HistoryEntry';
import { Colors, FontSize, Spacing, Radius } from '@/constants/theme';

interface Section {
  title: string;
  dateLabel: string;
  data: Entry[];
}

export default function HistoryScreen() {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState<Entry[]>([]);

  useFocusEffect(
    useCallback(() => {
      setEntries(getAllEntries(db));
    }, [db])
  );

  const sections: Section[] = useMemo(() => {
    const byDate = new Map<string, Entry[]>();
    for (const e of entries) {
      const arr = byDate.get(e.local_date) ?? [];
      arr.push(e);
      byDate.set(e.local_date, arr);
    }
    return Array.from(byDate.entries()).map(([date, data]) => ({
      title: date,
      dateLabel: format(parseISO(date), 'EEEE, MMMM d'),
      data,
    }));
  }, [entries]);

  if (entries.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>History</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🚭</Text>
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyText}>Your logged cigarettes will appear here.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <SectionList
        sections={sections}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <HistoryEntry entry={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionDate}>{section.dateLabel}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{section.data.length}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>History</Text>
            <Text style={styles.totalText}>{entries.length} total</Text>
          </View>
        }
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  screenTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  totalText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
  },
  sectionDate: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  countBadge: {
    backgroundColor: Colors.primaryDim,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  countText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  sectionGap: {
    height: Spacing.sm,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
