import { SQLiteProvider } from 'expo-sqlite';
import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { runMigrations } from '@/db/migrations';
import { DB_NAME } from '@/db/schema';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <Suspense fallback={
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    }>
      <SQLiteProvider
        databaseName={DB_NAME}
        onInit={runMigrations}
        useSuspense
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="log-modal"
            options={{
              presentation: 'formSheet',
              headerShown: true,
              title: 'Log Cigarette',
              headerTitleStyle: { fontWeight: '700' },
            }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
