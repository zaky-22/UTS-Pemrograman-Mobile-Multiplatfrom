import { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACE, TYPO } from '../styles/tokens';
import { useDaily } from '../context/DailyContext';

export default function HeaderBanner() {
   const { userProfile, updateProfile, totalPoints } = useDaily();
   const [isEditing, setIsEditing] = useState(false);
   const [name, setName] = useState(userProfile.name);

   const pickImage = async (type: 'avatar' | 'cover') => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: type === 'cover' ? [16, 9] : [1, 1],
         quality: 0.8,
      });

      if (!result.canceled) {
         const uri = result.assets[0].uri;
         if (type === 'avatar') {
            updateProfile(userProfile.name, uri, userProfile.cover);
         } else {
            updateProfile(userProfile.name, userProfile.avatar, uri);
         }
      }
   };

   const handleSaveProfile = () => {
      updateProfile(name, userProfile.avatar, userProfile.cover);
      setIsEditing(false);
   };

   return (
      <View style={styles.cardContainer}>
         {/* Cover Image */}
         <View style={styles.coverWrapper}>
            <Image source={{ uri: userProfile.cover }} style={styles.coverImage} />
            <Pressable style={styles.editCoverBtn} onPress={() => pickImage('cover')}>
               <Text style={styles.btnIconText}>📷 Ubah Sampul</Text>
            </Pressable>
         </View>

         {/* Profile Info Section */}
         <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
               <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
               <Pressable style={styles.editAvatarBtn} onPress={() => pickImage('avatar')}>
                  <Text style={styles.smallIconText}>📷</Text>
               </Pressable>
            </View>

            <View style={styles.infoWrapper}>
               <View style={styles.nameRow}>
                  <Text style={styles.greeting} numberOfLines={1}>Halo, {userProfile.name} 👋</Text>
                  <Pressable onPress={() => setIsEditing(true)} style={styles.settingsBtn}>
                     <Text style={styles.editActionText}>✏️ Edit</Text>
                  </Pressable>
               </View>
               <Text style={styles.subtitle}>Terus jaga konsistensi harimu!</Text>
            </View>

            <View style={styles.badge}>
               <Text style={styles.badgeText}>🔥 {totalPoints} Pts</Text>
            </View>
         </View>

         {/* Modal Edit Profile Name */}
         <Modal visible={isEditing} transparent animationType="fade">
            <View style={styles.modalOverlay}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Edit Nama Profil</Text>
                  <TextInput
                     style={styles.modalInput}
                     value={name}
                     onChangeText={setName}
                     placeholder="Masukkan nama kamu"
                  />
                  <View style={styles.modalActions}>
                     <Pressable style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setIsEditing(false)}>
                        <Text style={styles.cancelText}>Batal</Text>
                     </Pressable>
                     <Pressable style={[styles.modalBtn, styles.saveBtn]} onPress={handleSaveProfile}>
                        <Text style={styles.saveText}>Simpan</Text>
                     </Pressable>
                  </View>
               </View>
            </View>
         </Modal>
      </View>
   );
}

const styles = StyleSheet.create({
   cardContainer: {
      backgroundColor: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: COLORS.border,
      marginBottom: SPACE.m,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
   },
   coverWrapper: {
      height: 110,
      width: '100%',
      backgroundColor: '#e2e8f0',
      position: 'relative',
   },
   coverImage: {
      width: '100%',
      height: '100%',
   },
   editCoverBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
   },
   btnIconText: { color: '#fff', fontSize: 11, fontWeight: '600' },
   profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SPACE.m,
      paddingTop: 0,
      marginTop: -25,
      justifyContent: 'space-between',
   },
   avatarContainer: {
      position: 'relative',
      marginRight: SPACE.s,
   },
   avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 3,
      borderColor: '#fff',
      backgroundColor: '#cbd5e1',
   },
   editAvatarBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: COLORS.primary,
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#fff',
   },
   smallIconText: { fontSize: 10 },
   infoWrapper: {
      flex: 1,
      justifyContent: 'center',
   },
   nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
   },
   greeting: { fontSize: 15, color: COLORS.text, fontWeight: '700', flexShrink: 1 },
   subtitle: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
   settingsBtn: {
      backgroundColor: '#f1f5f9',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
   },
   editActionText: { fontSize: 11, fontWeight: '600', color: COLORS.primary },
   badge: {
      backgroundColor: '#eff6ff',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#bfdbfe',
      marginLeft: 4,
   },
   badgeText: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },
   modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   modalContent: {
      backgroundColor: '#fff',
      width: '80%',
      padding: 20,
      borderRadius: 16,
   },
   modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, color: COLORS.text },
   modalInput: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
      padding: 10,
      fontSize: 14,
      marginBottom: 16,
   },
   modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
   },
   modalBtn: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
   },
   cancelBtn: { backgroundColor: '#f1f5f9' },
   saveBtn: { backgroundColor: COLORS.primary },
   cancelText: { color: COLORS.text, fontWeight: '600' },
   saveText: { color: '#fff', fontWeight: '600' },
});