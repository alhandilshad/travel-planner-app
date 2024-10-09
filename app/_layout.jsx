import { Stack } from "expo-router";
import { useFonts } from 'expo-font'
import {CreateTripContext} from '@/context/CreateTripContext'
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    'outfit': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('@/assets/fonts/Outfit-Medium.ttf'),
  })
  const [tripData, settripData] = useState([]);
  return (
    <CreateTripContext.Provider value={{tripData, settripData}}>
      <Stack screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="index" options={{headerShown: false}} /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
    </CreateTripContext.Provider>
  );
}
