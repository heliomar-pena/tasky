import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }} />
      <Toaster duration={2000} theme="light" position={"bottom-center"} richColors />
    </GestureHandlerRootView>
  );
}
