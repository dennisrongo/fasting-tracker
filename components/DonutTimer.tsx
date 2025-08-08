import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export type DonutTimerProps = {
  size?: number; // px
  strokeWidth?: number; // px
  progress: number; // 0..1
  durationLabel?: string; // e.g. "16:8 Fast"
  centerText?: string; // e.g. elapsed time
  subText?: string; // e.g. remaining
};

export default function DonutTimer({
  size = 260,
  strokeWidth = 16,
  progress,
  durationLabel,
  centerText,
  subText,
}: DonutTimerProps) {
  const theme = useColorScheme() ?? 'light';
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const clamped = Math.max(0, Math.min(1, progress ?? 0));
  const dashOffset = useMemo(() => circumference * (1 - clamped), [circumference, clamped]);

  // Theme-aware colors for visibility across light/dark backgrounds
  const trackColor = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)';
  const progressColor = theme === 'dark' ? '#7AB5FF' : '#3B82F6';

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
        />
      </Svg>

      <View style={styles.center} pointerEvents="none">
        {durationLabel ? <Text style={styles.label}>{durationLabel}</Text> : null}
        {centerText ? <Text style={styles.centerText}>{centerText}</Text> : null}
        {subText ? <Text style={styles.subText}>{subText}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
  },
  centerText: {
    fontSize: 28,
    fontWeight: '700',
  },
  subText: {
    fontSize: 13,
    opacity: 0.8,
  },
});
