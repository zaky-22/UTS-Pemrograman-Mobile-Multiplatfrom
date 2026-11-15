import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useDaily } from '../../src/context/DailyContext';
import InputField from '../../src/components/InputField';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function CreateScreen() {
   const router = useRouter();
   const { addActivity } = useDaily();

   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('Kesehatan');
   const [time, setTime] = useState('08:00');
   const [imageUri, setImageUri] = useState<string | undefined>(undefined);

   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 0.8,
      });

      if (!result.canceled) {
         setImageUri(result.assets[0].uri);
      }
   };

   const handleSave = () => {
      if (!title.trim()) return;
      addActivity(title, category, time, 20, imageUri);
      router.back();
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.header}>Tambah Aktivitas Baru</Text>

         <InputField
            label="Nama Aktivitas"
            value={title}
            onChangeText={setTitle}
            placeholder="Contoh: Jogging sore"
         />
         <InputField
            label="Kategori"
            value={category}
            onChangeText={setCategory}
            placeholder="Kesehatan / Akademik / dll"
         />
         <InputField
            label="Waktu"
            value={time}
            onChangeText={setTime}
            placeholder="08:00"
         />

         <Text style={styles.labelPhoto}>Dokumentasi Foto Kegiatan</Text>
         <Pressable style={styles.imagePickerBtn} onPress={pickImage}>
            {imageUri ? (
               <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
               <View style={styles.placeholderPhoto}>
                  <Text style={styles.cameraEmoji}>📷</Text>
                  <Text style={styles.placeholderText}>Pilih Foto / Choose File</Text>
               </View>
            )}
         </Pressable>

         <Pressable onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Simpan Aktivitas</Text>
         </Pressable>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: { padding: SPACE.l, backgroundColor: COLORS.background, flexGrow: 1 },
   header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text, marginBottom: SPACE.l },
   labelPhoto: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: SPACE.xs },
   imagePickerBtn: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderStyle: 'dashed',
      borderRadius: 12,
      backgroundColor: '#fff',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      marginBottom: SPACE.m,
   },
   previewImage: { width: '100%', height: '100%' },
   placeholderPhoto: { alignItems: 'center', justifyContent: 'center' },
   cameraEmoji: { fontSize: 28, marginBottom: 4 },
   placeholderText: { color: COLORS.muted, fontSize: 13 },
   button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: SPACE.m },
   buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});