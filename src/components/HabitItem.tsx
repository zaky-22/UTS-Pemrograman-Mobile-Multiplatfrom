import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS, SPACE } from '../styles/tokens';

interface HabitProps {
   title: string;
   category: string;
   time: string;
   completed: boolean;
   points: number;
   imageUri?: string;
   onToggle: () => void;
   onPressDetail: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HabitItem({ title, category, time, completed, points, imageUri, onToggle, onPressDetail }: HabitProps) {
   const scale = useSharedValue(1);

   const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
   }));

   const handlePressIn = () => {
      scale.value = withSpring(0.97, { damping: 10, stiffness: 300 });
   };

   const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 300 });
   };

   return (
      <AnimatedPressable
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
         onPress={onPressDetail}
         style={[styles.container, completed && styles.completedBg, animatedStyle]}
      >
         <Pressable onPress={onToggle} style={[styles.checkbox, completed && styles.checkedBox]}>
            <Text style={styles.checkText}>{completed ? '✓' : ''}</Text>
         </Pressable>

         <View style={styles.info}>
            <Text style={[styles.title, completed && styles.completedText]} numberOfLines={1}>
               {title}
            </Text>
            <View style={styles.metaRow}>
               <Text style={styles.meta}>{category}</Text>
               <Text style={styles.metaDot}>•</Text>
               <Text style={styles.meta}>⏰ {time}</Text>
            </View>
            {imageUri && (
               <Image source={{ uri: imageUri }} style={styles.thumbnail} />
            )}
         </View>

         <View style={styles.rightContent}>
            <Text style={styles.points}>+{points}</Text>
            <Text style={styles.arrow}> › </Text>
         </View>
      </AnimatedPressable>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      padding: SPACE.m,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginBottom: SPACE.s,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
   },
   completedBg: { backgroundColor: '#f8fafc', borderColor: '#e2e8f0' },
   checkbox: {
      width: 26,
      height: 26,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACE.s,
   },
   checkedBox: { backgroundColor: COLORS.success, borderColor: COLORS.success },
   checkText: { color: '#fff', fontWeight: '700', fontSize: 12 },
   info: { flex: 1 },
   title: { fontSize: 15, fontWeight: '600', color: COLORS.text },
   completedText: { textDecorationLine: 'line-through', color: COLORS.muted },
   metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 4 },
   meta: { fontSize: 12, color: COLORS.muted },
   metaDot: { color: COLORS.muted, fontSize: 12 },
   thumbnail: {
      width: 40,
      height: 40,
      borderRadius: 6,
      marginTop: 6,
   },
   rightContent: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
   },
   points: { fontWeight: '700', color: COLORS.primary, fontSize: 14 },
   arrow: { fontSize: 18, color: COLORS.muted, marginLeft: 4 },
});