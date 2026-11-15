import { Stack } from 'expo-router';
import { DailyProvider } from '../src/context/DailyContext';

export default function RootLayout() {
   return (
      <DailyProvider>
         <Stack screenOptions={{ headerShown: false }} />
      </DailyProvider>
   );
}