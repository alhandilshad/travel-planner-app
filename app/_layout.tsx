import { Stack } from "expo-router";
import { useFonts } from 'expo-font'

export default function RootLayout() {
  useFonts({
    'outfit': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('@/assets/fonts/Outfit-Medium.ttf'),
  })
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="index" options={{headerShown: false}} /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
