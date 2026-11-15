import { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useDaily } from '../../src/context/DailyContext';
import HeaderBanner from '../../src/components/HeaderBanner';
import CategoryFilter from '../../src/components/CategoryFilter';
import HabitItem from '../../src/components/HabitItem';
import EmptyState from '../../src/components/EmptyState';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function HomeScreen() {
   const router = useRouter();
   const { activities, toggleActivity, totalPoints } = useDaily();
   const [selectedCategory, setSelectedCategory] = useState('Semua');

   // Menggunakan useMemo untuk optimalisasi filter data berdasarkan kategori
   const filteredActivities = useMemo(() => {
      if (selectedCategory === 'Semua') return activities;
      return activities.filter((item) => item.category === selectedCategory);
   }, [activities, selectedCategory]);

   return (
      <View style={styles.container}>
         <HeaderBanner userName="Azra Zaky" totalPoints={totalPoints} />
         
         <Text style={styles.sectionTitle}>Daftar Aktivitas Hari Ini</Text>
         <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

         <FlatList
            data={filteredActivities}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
               <HabitItem
                  title={item.title}
                  category={item.category}
                  time={item.time}
                  completed={item.completed}
                  points={item.points}
                  onToggle={() => toggleActivity(item.id)}
                  onPressDetail={() => router.push(`/detail/${item.id}`)}
               />
            )}
            ListEmptyComponent={<EmptyState />}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
   sectionTitle: { fontSize: TYPO.h2, fontWeight: '700', color: COLORS.text, marginBottom: SPACE.s },
   list: { paddingBottom: SPACE.xl },
});