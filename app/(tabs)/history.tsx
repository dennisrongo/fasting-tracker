import React, { useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAppState } from '@/state/AppState';

function fmtHours(h: number) {
  return `${h.toFixed(2)}h`;
}

export default function HistoryScreen() {
  const { state } = useAppState();
  const items = state.history;
  const methodsById = useMemo(
    () => Object.fromEntries(state.methods.map((m) => [m.id, m])),
    [state.methods]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fasting History</Text>
      <Text style={styles.subtitle}>
        Completed fasts: {items.length}
      </Text>

      <FlatList
        style={{ width: '100%', marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        data={items}
        keyExtractor={(item, idx) => `${item.startISO}-${idx}`}
        renderItem={({ item }) => {
          const method = methodsById[item.methodId];
          return (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{method?.name ?? item.methodId}</Text>
                <Text style={styles.rowSub}>
                  {new Date(item.startISO).toLocaleString()} → {new Date(item.endISO).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.badge}>{fmtHours(item.durationHours)}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>No completed fasts yet.</Text>
            <Text>Start a fast on the Home tab.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  row: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  rowSub: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#2f95dc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  empty: {
    marginTop: 24,
    alignItems: 'center',
    gap: 4,
  },
});
