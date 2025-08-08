import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useAppState } from '@/state/AppState';
import DonutTimer from '@/components/DonutTimer';

function formatHMS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function HomeScreen() {
  const { state, startFast, endFast } = useAppState();
  const active = state.activeFast;
  const selectedMethod = useMemo(
    () => state.methods.find((m) => m.id === state.selectedMethodId),
    [state.methods, state.selectedMethodId]
  );

  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let timer: any;
    if (active) {
      const tick = () => {
        const deltaMs = Date.now() - new Date(active.startISO).getTime();
        setElapsed(Math.max(0, Math.floor(deltaMs / 1000)));
      };
      tick();
      timer = setInterval(tick, 1000);
    } else {
      setElapsed(0);
    }
    return () => timer && clearInterval(timer);
  }, [active?.startISO]);

  const totalSecs = (selectedMethod?.fastingHours ?? 16) * 3600;
  const clampedElapsed = active ? Math.min(elapsed, totalSecs) : 0;
  const remaining = Math.max(0, totalSecs - clampedElapsed);
  const progress = active ? clampedElapsed / totalSecs : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fasting Tracker</Text>
      <Text style={styles.subheading}>{selectedMethod?.name} Method</Text>

      <DonutTimer
        size={200}
        strokeWidth={14}
        progress={progress}
        durationLabel={`${selectedMethod?.name} Fast`}
        centerText={active ? formatHMS(clampedElapsed) : 'Ready'}
        subText={active ? `${formatHMS(remaining)} remaining` : 'Tap Start to begin'}
      />

      {active ? (
        <Pressable style={[styles.button, styles.endBtn]} onPress={() => endFast()}>
          <Text style={styles.buttonText}>End Fast</Text>
        </Pressable>
      ) : (
        <Pressable style={[styles.button, styles.startBtn]} onPress={() => startFast()}>
          <Text style={styles.buttonText}>Start Fast</Text>
        </Pressable>
      )}

      <View style={styles.details}>
        <Text>
          Fasting: {selectedMethod?.fastingHours}h • Eating: {selectedMethod?.eatingHours}h
        </Text>
        {active && (
          <Text>Started: {new Date(active.startISO).toLocaleString()}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 16,
    opacity: 0.7,
  },
  timerWrapper: {
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1,
  },
  timerLabel: {
    marginTop: 4,
    opacity: 0.7,
  },
  button: {
    minWidth: 180,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  startBtn: {
    backgroundColor: '#22c55e',
  },
  endBtn: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  details: {
    marginTop: 12,
    alignItems: 'center',
    gap: 4,
  },
});
