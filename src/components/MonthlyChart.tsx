import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getDaysInMonth, parseISO, format } from 'date-fns';
import { DailyStat } from '../types';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 4;

interface Props {
  data: DailyStat[];
  yearMonth: string;
}

export default function MonthlyChart({ data, yearMonth }: Props) {
  const daysInMonth = getDaysInMonth(parseISO(`${yearMonth}-01`));

  const values = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    const date = `${yearMonth}-${day}`;
    const stat = data.find(d => d.local_date === date);
    return stat?.count ?? 0;
  });

  const labels = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1) % 5 === 1 ? String(i + 1) : ''
  );

  const chartData = { labels, datasets: [{ data: values }] };

  if (values.every(v => v === 0)) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>No data this month</Text>
      </View>
    );
  }

  const monthLabel = format(parseISO(`${yearMonth}-01`), 'MMMM yyyy');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{monthLabel}</Text>
      <LineChart
        data={chartData}
        width={CHART_WIDTH}
        height={160}
        bezier
        fromZero
        withDots={false}
        chartConfig={{
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(229, 57, 53, ${opacity})`,
          labelColor: () => Colors.textSecondary,
          strokeWidth: 2,
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
