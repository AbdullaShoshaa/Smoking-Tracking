import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { insertEntry } from '@/db/queries';
import { Mood } from '@/types';
import MoodSelector from '@/components/MoodSelector';
import NoteInput from '@/components/NoteInput';
import { Colors, FontSize, Spacing, Radius } from '@/constants/theme';

export default function LogModal() {
  const db = useSQLiteContext();
  const [selectedMood, setSelectedMood] = useState<Mood>('other');
  const [note, setNote] = useState('');

  const handleConfirm = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    insertEntry(db, selectedMood, note.trim() || null);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>How are you feeling?</Text>
          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
        </View>

        <View style={styles.section}>
          <NoteInput value={note} onChange={setNote} />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.85}>
          <Text style={styles.confirmText}>Log It</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
