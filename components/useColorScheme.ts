import { useThemeState } from '@/state/ThemeState';

export function useColorScheme() {
  const { theme } = useThemeState();
  return theme; // 'light' | 'dark'
}
