import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { HourlyBucket } from '../types';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 4;

const HOUR_LABELS = ['0','','','3','','','6','','','9','','','12','','','15','','','18','','','21','',''];

interface Props {
  data: HourlyBucket[];
}

export default function DailyChart({ data }: Props) {
  const values = Array.from({ length: 24 }, (_, h) => {
    const bucket = data.find(b => b.hour === h);
    return bucket?.count ?? 0;
  });

  const chartData = {
    labels: HOUR_LABELS,
    datasets: [{ data: values }],
  };

  if (values.every(v => v === 0)) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>No data for today</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hourly Distribution</Text>
      <BarChart
        data={chartData}
        width={CHART_WIDTH}
        height={160}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showValuesOnTopOfBars={false}
        chartConfig={{
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(229, 57, 53, ${opacity})`,
          labelColor: () => Colors.textSecondary,
          barPercentage: 0.5,
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
