import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useDaily } from '../../src/context/DailyContext';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
   const { id } = useLocalSearchParams();
   const router = useRouter();
   const { activities, deleteActivity, updateActivity } = useDaily();

   const activity = activities.find((item) => item.id === Number(id));

   const [isEditing, setIsEditing] = useState(false);
   const [title, setTitle] = useState(activity?.title || '');
   const [category, setCategory] = useState(activity?.category || '');
   const [time, setTime] = useState(activity?.time || '');
   const [imageUri, setImageUri] = useState<string | undefined>(activity?.imageUri);

   if (!activity) {
      return (
         <View style={styles.container}>
            <Text style={styles.text}>Aktivitas tidak ditemukan.</Text>
         </View>
      );
   }

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

   const handleUpdate = () => {
      updateActivity(activity.id, title, category, time, activity.points, imageUri);
      setIsEditing(false);
   };

   const handleDelete = () => {
      deleteActivity(activity.id);
      router.back();
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.headerRow}>
            <Text style={styles.header}>{isEditing ? 'Edit Aktivitas' : 'Detail Aktivitas'}</Text>
            <Pressable onPress={() => setIsEditing(!isEditing)} style={styles.editToggleBtn}>
               <Text style={styles.editText}>{isEditing ? '✕ Batal' : '✏️ Edit'}</Text>
            </Pressable>
         </View>

         {isEditing ? (
            <View style={styles.card}>
               <Text style={styles.label}>Nama Aktivitas:</Text>
               <TextInput style={styles.input} value={title} onChangeText={setTitle} />

               <Text style={styles.label}>Kategori:</Text>
               <TextInput style={styles.input} value={category} onChangeText={setCategory} />

               <Text style={styles.label}>Waktu Pelaksanaan:</Text>
               <TextInput style={styles.input} value={time} onChangeText={setTime} />

               <Text style={styles.label}>Foto Dokumentasi:</Text>
               <Pressable style={styles.imagePickerBtn} onPress={pickImage}>
                  {imageUri ? (
                     <Image source={{ uri: imageUri }} style={styles.previewImage} />
                  ) : (
                     <Text style={styles.placeholderText}>📷 Ganti Foto</Text>
                  )}
               </Pressable>

               <Pressable onPress={handleUpdate} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
               </Pressable>
            </View>
         ) : (
            <>
               <View style={styles.card}>
                  <Text style={styles.label}>Nama Aktivitas:</Text>
                  <Text style={styles.value}>{activity.title}</Text>

                  <Text style={styles.label}>Kategori:</Text>
                  <Text style={styles.value}>{activity.category}</Text>

                  <Text style={styles.label}>Waktu Pelaksanaan:</Text>
                  <Text style={styles.value}>⏰ {activity.time}</Text>

                  <Text style={styles.label}>Status Poin:</Text>
                  <Text style={styles.value}>+{activity.points} Poin ({activity.completed ? 'Selesai' : 'Belum Selesai'})</Text>

                  {activity.imageUri && (
                     <>
                        <Text style={styles.label}>Dokumentasi:</Text>
                        <Image source={{ uri: activity.imageUri }} style={styles.detailImage} />
                     </>
                  )}
               </View>

               <Pressable onPress={handleDelete} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Hapus Aktivitas</Text>
               </Pressable>
            </>
         )}

         <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>Kembali</Text>
         </Pressable>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: { padding: SPACE.l, backgroundColor: COLORS.background, flexGrow: 1 },
   headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE.l },
   header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
   editToggleBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#eff6ff', borderRadius: 8 },
   editText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
   card: { backgroundColor: COLORS.card, padding: SPACE.m, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACE.l },
   label: { fontSize: 13, color: COLORS.muted, marginTop: SPACE.s },
   value: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginTop: 2 },
   input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, marginTop: 4, backgroundColor: '#fff', fontSize: 15 },
   detailImage: { width: '100%', height: 200, borderRadius: 12, marginTop: 8 },
   imagePickerBtn: { borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: 8, height: 120, justifyContent: 'center', alignItems: 'center', marginTop: 4, backgroundColor: '#f8fafc' },
   previewImage: { width: '100%', height: '100%', borderRadius: 8 },
   placeholderText: { color: COLORS.muted },
   saveButton: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: SPACE.m },
   saveButtonText: { color: '#fff', fontWeight: '700' },
   deleteButton: { backgroundColor: '#ef4444', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: SPACE.s },
   deleteText: { color: '#fff', fontWeight: '700' },
   backButton: { borderWidth: 1, borderColor: COLORS.border, padding: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#fff' },
   backText: { color: COLORS.text, fontWeight: '600' },
   text: { fontSize: 16, color: COLORS.text, textAlign: 'center', marginTop: 40 },
});