import { StyleSheet, Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useThemeState } from '@/state/ThemeState';

export default function SettingsScreen() {
  const { theme, setTheme, toggleTheme } = useThemeState();
  const isDark = theme === 'dark';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={() => toggleTheme()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
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
  row: {
    width: '100%',
    maxWidth: 500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
