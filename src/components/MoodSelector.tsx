import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mood } from '../types';
import { MOOD_OPTIONS } from '../constants/moods';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface Props {
  selected: Mood;
  onSelect: (mood: Mood) => void;
}

export default function MoodSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {MOOD_OPTIONS.map(option => {
        const isSelected = selected === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => onSelect(option.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  button: {
    width: '30%',
    flexGrow: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  buttonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryDim,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  labelSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
