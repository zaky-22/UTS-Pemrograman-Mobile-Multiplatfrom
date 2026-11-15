import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { COLORS, SPACE } from '../styles/tokens';

const CATEGORIES = ['Semua', 'Kesehatan', 'Akademik', 'Self-Improvement'];

interface FilterProps {
   selected: string;
   onSelect: (cat: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: FilterProps) {
   return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
         {CATEGORIES.map((cat) => {
            const active = selected === cat;
            return (
               <Pressable key={cat} onPress={() => onSelect(cat)} style={[styles.chip, active && styles.activeChip]}>
                  <Text style={[styles.text, active && styles.activeText]}>{cat}</Text>
               </Pressable>
            );
         })}
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   row: { gap: SPACE.s, marginBottom: SPACE.m },
   chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#fff', height: 38, justifyContent: 'center' },
   activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
   text: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
   activeText: { color: '#fff', fontWeight: '700' },
});