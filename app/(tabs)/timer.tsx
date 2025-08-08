import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import DonutTimer from '@/components/DonutTimer';
import { useAppState } from '@/state/AppState';

export default function TimerScreen() {
  const { state, startFast, endFast } = useAppState();
  const active = state.activeFast;
  const method = useMemo(() => {
    const id = active?.methodId ?? state.selectedMethodId;
    return state.methods.find((m) => m.id === id) ?? state.methods[0];
  }, [active?.methodId, state.methods, state.selectedMethodId]);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const totalSecs = (method?.fastingHours ?? 16) * 3600;
  const startTime = active ? new Date(active.startISO).getTime() : now.getTime();
  const elapsedSecs = Math.max(0, Math.floor((now.getTime() - startTime) / 1000));
  const clampedElapsed = active ? Math.min(elapsedSecs, totalSecs) : 0;
  const remainingSecs = Math.max(0, totalSecs - clampedElapsed);
  const progress = active ? clampedElapsed / totalSecs : 0;

  function fmtHMS(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  const durationLabel = method ? `${method.name} Fast` : 'Fast';
  const centerText = active ? fmtHMS(clampedElapsed) : 'Not Fasting';
  const subText = active ? `${fmtHMS(remainingSecs)} remaining` : 'Tap Start to begin';

  const handlePrimary = () => {
    if (active) endFast();
    else startFast();
  };

  return (
    <View style={styles.container}>
      <DonutTimer
        size={280}
        strokeWidth={18}
        progress={progress}
        durationLabel={durationLabel}
        centerText={centerText}
        subText={subText}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={handlePrimary}>
        <Text style={styles.primaryBtnText}>{active ? 'End Fast' : 'Start Fast'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  primaryBtn: {
    backgroundColor: '#5E9CFF',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
