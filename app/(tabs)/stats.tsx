import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import {
  getTodayCount,
  getHourlyBuckets,
  getDayMoodBreakdown,
  getWeeklyDailyCounts,
  getWeekMoodBreakdown,
  getMonthlyDailyCounts,
  getMonthMoodBreakdown,
} from '@/db/queries';
import { HourlyBucket, DailyStat, MoodCount } from '@/types';
import { useDateRange } from '@/hooks/useDateRange';
import StatCard from '@/components/StatCard';
import DailyChart from '@/components/DailyChart';
import WeeklyChart from '@/components/WeeklyChart';
import MonthlyChart from '@/components/MonthlyChart';
import MoodBreakdown from '@/components/MoodBreakdown';
import { Colors, FontSize, Spacing, Radius } from '@/constants/theme';

type Tab = 'daily' | 'weekly' | 'monthly';

export default function StatsScreen() {
  const db = useSQLiteContext();
  const { today, yearMonth, weekStart, weekEnd } = useDateRange();
  const [activeTab, setActiveTab] = useState<Tab>('daily');

  const [todayCount, setTodayCount] = useState(0);
  const [hourly, setHourly] = useState<HourlyBucket[]>([]);
  const [dailyMoods, setDailyMoods] = useState<MoodCount[]>([]);

  const [weekCount, setWeekCount] = useState(0);
  const [weeklyDays, setWeeklyDays] = useState<DailyStat[]>([]);
  const [weeklyMoods, setWeeklyMoods] = useState<MoodCount[]>([]);

  const [monthCount, setMonthCount] = useState(0);
  const [monthlyDays, setMonthlyDays] = useState<DailyStat[]>([]);
  const [monthlyMoods, setMonthlyMoods] = useState<MoodCount[]>([]);

  useFocusEffect(
    useCallback(() => {
      setTodayCount(getTodayCount(db, today));
      setHourly(getHourlyBuckets(db, today));
      setDailyMoods(getDayMoodBreakdown(db, today));

      const weekData = getWeeklyDailyCounts(db, weekStart, weekEnd);
      setWeeklyDays(weekData);
      setWeekCount(weekData.reduce((s, d) => s + d.count, 0));
      setWeeklyMoods(getWeekMoodBreakdown(db, weekStart, weekEnd));

      const monthData = getMonthlyDailyCounts(db, yearMonth);
      setMonthlyDays(monthData);
      setMonthCount(monthData.reduce((s, d) => s + d.count, 0));
      setMonthlyMoods(getMonthMoodBreakdown(db, yearMonth));
    }, [db, today, weekStart, weekEnd, yearMonth])
  );

  const TABS: { key: Tab; label: string }[] = [
    { key: 'daily',   label: 'Today' },
    { key: 'weekly',  label: 'Week' },
    { key: 'monthly', label: 'Month' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Stats</Text>
      </View>

      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'daily' && (
          <>
            <StatCard value={todayCount} label="Today's Cigarettes" />
            <DailyChart data={hourly} />
            <MoodBreakdown data={dailyMoods} />
          </>
        )}

        {activeTab === 'weekly' && (
          <>
            <StatCard value={weekCount} label="This Week's Total" subtitle="Monday – Sunday" />
            <WeeklyChart data={weeklyDays} weekStart={weekStart} />
            <MoodBreakdown data={weeklyMoods} />
          </>
        )}

        {activeTab === 'monthly' && (
          <>
            <StatCard value={monthCount} label="This Month's Total" />
            <MonthlyChart data={monthlyDays} yearMonth={yearMonth} />
            <MoodBreakdown data={monthlyMoods} />
          </>
        )}
      </ScrollView>
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
  },
  screenTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.border,
    borderRadius: Radius.md,
    padding: 3,
    marginBottom: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabLabel: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});
