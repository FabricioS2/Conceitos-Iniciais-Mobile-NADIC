import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import './global.css';

export default function RootLayout() {
  return (
    <CartProvider>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* NÃO defina product/[id] aqui! Ela é registrada automaticamente. */}
        </Stack>
      </ToastProvider>
    </CartProvider>
  );
}