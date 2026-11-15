import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACE, TYPO } from '../styles/tokens';

export default function EmptyState() {
   return (
      <View style={styles.container}>
         <Text style={styles.emoji}>🌱</Text>
         <Text style={styles.text}>Belum ada aktivitas di kategori ini.</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { padding: 40, alignItems: 'center' },
   emoji: { fontSize: 40, marginBottom: SPACE.s },
   text: { color: COLORS.muted, fontSize: TYPO.body, textAlign: 'center' },
});