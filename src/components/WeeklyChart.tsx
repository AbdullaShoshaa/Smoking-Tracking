import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { addDays, format, parseISO } from 'date-fns';
import { DailyStat } from '../types';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 4;

interface Props {
  data: DailyStat[];
  weekStart: string;
}

export default function WeeklyChart({ data, weekStart }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = format(addDays(parseISO(weekStart), i), 'yyyy-MM-dd');
    const stat = data.find(d => d.local_date === date);
    return stat?.count ?? 0;
  });

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartData = { labels, datasets: [{ data: days }] };

  if (days.every(v => v === 0)) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>No data this week</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>This Week</Text>
      <BarChart
        data={chartData}
        width={CHART_WIDTH}
        height={160}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(229, 57, 53, ${opacity})`,
          labelColor: () => Colors.textSecondary,
          barPercentage: 0.65,
          propsForBackgroundLines: { stroke: Colors.border },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
    marginBottom: Spacing.sm,
  },
  chart: {
    marginLeft: -Spacing.md,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
