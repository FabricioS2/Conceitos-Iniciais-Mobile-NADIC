import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';
import '../app/global.css'; // Importe seu CSS com Tailwind

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{ headerTitle: 'Detalhes do Produto' }}
        />
      </Stack>
    </CartProvider>
  );
}