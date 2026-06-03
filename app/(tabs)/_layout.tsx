import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useCart } from '../../hooks/useCart';

export default function TabLayout() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏪</Text>,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🛒</Text>,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
    </Tabs>
  );
}