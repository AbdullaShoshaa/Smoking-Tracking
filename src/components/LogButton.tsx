import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Colors, FontSize, Spacing } from '../constants/theme';

export default function LogButton() {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/log-modal');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.85}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>🚬</Text>
        <Text style={styles.label}>Track Cigarette</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  inner: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emoji: {
    fontSize: 48,
  },
  label: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
