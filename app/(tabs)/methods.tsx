import React from 'react';
import { StyleSheet, Pressable, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAppState } from '@/state/AppState';

export default function MethodsScreen() {
  const { state, selectMethod } = useAppState();
  const selected = state.selectedMethodId;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fasting Methods</Text>
      <Text style={styles.subtitle}>Choose your preferred schedule</Text>

      <FlatList
        style={{ width: '100%', marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        data={state.methods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = item.id === selected;
          return (
            <Pressable
              onPress={() => selectMethod(item.id)}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>
                  Fasting {item.fastingHours}h • Eating {item.eatingHours}h
                </Text>
              </View>
              {isSelected && (
                <Text style={styles.badge}>Selected</Text>
              )}
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
  card: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardSelected: {
    borderColor: '#2f95dc',
    backgroundColor: 'rgba(47,149,220,0.08)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: 2,
    opacity: 0.7,
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
});
