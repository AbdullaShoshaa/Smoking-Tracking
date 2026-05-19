import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function NoteInput({ value, onChange }: Props) {
  return (
    <View>
      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="What's going on?"
        placeholderTextColor={Colors.textSecondary}
        multiline
        maxLength={280}
        returnKeyType="done"
        blurOnSubmit
      />
      <Text style={styles.counter}>{value.length}/280</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  counter: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: Spacing.xs,
  },
});
