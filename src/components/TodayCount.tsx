import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface Props {
  count: number;
}

export default function TodayCount({ count }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>{count}</Text>
      <Text style={styles.label}>{count === 1 ? 'cigarette today' : 'cigarettes today'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  number: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.primary,
    lineHeight: 72,
  },
  label: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
