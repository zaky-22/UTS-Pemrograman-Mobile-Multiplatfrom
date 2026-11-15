import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/tokens';

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.muted,
            headerShown: false,
            tabBarStyle: { elevation: 0, borderTopWidth: 1, borderTopColor: COLORS.border, height: 60, paddingBottom: 8 },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'Beranda',
               tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
         />
         <Tabs.Screen
            name="create"
            options={{
               title: 'Tambah',
               tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
            }}
         />
      </Tabs>
   );
}