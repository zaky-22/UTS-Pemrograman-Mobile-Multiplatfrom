import React, { createContext, useContext, useState } from 'react';

export interface ActivityItem {
   id: number;
   title: string;
   category: string;
   time: string;
   completed: boolean;
   points: number;
   imageUri?: string; // Menyimpan foto dokumentasi kegiatan
}

interface DailyContextType {
   activities: ActivityItem[];
   toggleActivity: (id: number) => void;
   addActivity: (title: string, category: string, time: string, points: number, imageUri?: string) => void;
   updateActivity: (id: number, title: string, category: string, time: string, points: number, imageUri?: string) => void;
   deleteActivity: (id: number) => void;
   totalPoints: number;
   userProfile: { name: string; avatar: string; cover: string };
   updateProfile: (name: string, avatar: string, cover: string) => void;
}

const DailyContext = createContext<DailyContextType | undefined>(undefined);

export function DailyProvider({ children }: { children: React.ReactNode }) {
   const [userProfile, setUserProfile] = useState({
      name: 'Azra Abizar Zaky',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000',
   });

   const [activities, setActivities] = useState<ActivityItem[]>([
      { id: 1, title: 'Olahraga Pagi (Senam Kalistenik)', category: 'Kesehatan', time: '06:00', completed: true, points: 20 },
      { id: 2, title: 'Belajar Pemrograman Mobile', category: 'Akademik', time: '09:00', completed: false, points: 30 },
      { id: 3, title: 'Membaca Buku 30 Menit', category: 'Pengembangan Diri', time: '19:00', completed: false, points: 15 },
   ]);

   const toggleActivity = (id: number) => {
      setActivities((prev) =>
         prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
      );
   };

   const addActivity = (title: string, category: string, time: string, points: number, imageUri?: string) => {
      const newItem: ActivityItem = {
         id: Date.now(),
         title,
         category,
         time,
         completed: false,
         points,
         imageUri,
      };
      setActivities((prev) => [newItem, ...prev]);
   };

   const updateActivity = (id: number, title: string, category: string, time: string, points: number, imageUri?: string) => {
      setActivities((prev) =>
         prev.map((item) => (item.id === id ? { ...item, title, category, time, points, imageUri: imageUri ?? item.imageUri } : item))
      );
   };

   const deleteActivity = (id: number) => {
      setActivities((prev) => prev.filter((item) => item.id !== id));
   };

   const updateProfile = (name: string, avatar: string, cover: string) => {
      setUserProfile({ name, avatar, cover });
   };

   const totalPoints = activities.reduce((sum, item) => (item.completed ? sum + item.points : sum), 0);

   return (
      <DailyContext.Provider
         value={{ activities, toggleActivity, addActivity, updateActivity, deleteActivity, totalPoints, userProfile, updateProfile }}
      >
         {children}
      </DailyContext.Provider>
   );
}

export function useDaily() {
   const context = useContext(DailyContext);
   if (!context) throw new Error('useDaily harus digunakan di dalam DailyProvider');
   return context;
}