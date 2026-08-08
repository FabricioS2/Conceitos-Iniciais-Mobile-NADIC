// app/_layout.tsx
import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import './global.css';

export default function RootLayout() {
  return (
    <CartProvider>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </CartProvider>
  );
}