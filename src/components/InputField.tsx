import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, SPACE } from '../styles/tokens';

interface InputProps {
   label: string;
   value: string;
   onChangeText: (text: string) => void;
   placeholder: string;
}

export default function InputField({ label, value, onChangeText, placeholder }: InputProps) {
   return (
      <View style={styles.group}>
         <Text style={styles.label}>{label}</Text>
         <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#94a3b8" />
      </View>
   );
}

const styles = StyleSheet.create({
   group: { marginBottom: SPACE.m },
   label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: SPACE.xs },
   input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, backgroundColor: '#fff', fontSize: 15, color: COLORS.text },
});