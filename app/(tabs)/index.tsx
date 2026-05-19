import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { format } from 'date-fns';
import { getTodayCount, getRecentEntries } from '@/db/queries';
import { Entry } from '@/types';
import LogButton from '@/components/LogButton';
import TodayCount from '@/components/TodayCount';
import RecentList from '@/components/RecentList';
import { Colors, FontSize, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [todayCount, setTodayCount] = useState(0);
  const [recent, setRecent] = useState<Entry[]>([]);
  const today = format(new Date(), 'EEEE, MMMM d');

  useFocusEffect(
    useCallback(() => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      setTodayCount(getTodayCount(db, todayStr));
      setRecent(getRecentEntries(db, 5));
    }, [db])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>Smoke Tracker</Text>
          <Text style={styles.date}>{today}</Text>
        </View>

        <TodayCount count={todayCount} />

        <LogButton />

        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent</Text>
        </View>
        <RecentList entries={recent} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
  },
  appName: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  recentHeader: {
    marginBottom: -Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
