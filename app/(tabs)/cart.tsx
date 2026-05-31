import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { router } from 'expo-router';

export default function CartScreen() {
  const { items, total, clearCart } = useCart();

  const handleClearCart = () => {
    Alert.alert('Limpar carrinho', 'Tem certeza que deseja remover todos os itens?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', onPress: clearCart, style: 'destructive' },
    ]);
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-lg text-gray-500">Seu carrinho está vazio</Text>
        <TouchableOpacity
          className="mt-4 bg-green-600 px-6 py-3 rounded-xl"
          onPress={() => router.push('/')}
        >
          <Text className="text-white font-bold">Ver produtos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartItem item={item} />}
        className="flex-1"
      />
      <View className="bg-white rounded-xl p-4 mt-4 shadow-md">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Total:</Text>
          <Text className="text-2xl font-bold text-green-700">
            R$ {total.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-red-500 py-2 rounded-lg"
          onPress={handleClearCart}
        >
          <Text className="text-white text-center font-bold">Limpar carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}