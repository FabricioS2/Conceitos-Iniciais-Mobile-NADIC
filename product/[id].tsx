import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem, items } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const cartItem = items.find(item => item.product.id === id);
  const alreadyInCartQty = cartItem ? cartItem.quantity : 0;

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl text-gray-500">Produto não encontrado</Text>
      </View>
    );
  }

  const handleAdd = () => {
    addItem(product, quantity);
    showToast(`${product.emoji} ${quantity}x ${product.name} adicionado!`, 'success');
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <View className="flex-1 bg-white">
        <View className="h-64 bg-green-50 items-center justify-center">
          <Text className="text-8xl">{product.emoji}</Text>
        </View>
        <View className="p-4 flex-1">
          <View className="bg-green-50 self-start px-3 py-1 rounded-full mb-2">
            <Text className="text-xs font-bold text-green-800">{product.category}</Text>
          </View>
          <Text className="text-2xl font-extrabold text-gray-900">{product.name}</Text>
          <Text className="text-3xl font-extrabold text-green-700 mt-1">
            R$ {product.price.toFixed(2)} <Text className="text-base font-medium text-gray-500">/{product.unit}</Text>
          </Text>
          <Text className="text-base text-gray-600 mt-3 leading-relaxed">{product.desc}</Text>
          {alreadyInCartQty > 0 && (
            <View className="bg-green-50 mt-3 self-start px-4 py-1 rounded-full">
              <Text className="text-sm text-green-800 font-semibold">📦 Já no carrinho: {alreadyInCartQty} unidade(s)</Text>
            </View>
          )}
          <View className="flex-row items-center mt-6 gap-3">
            <Text className="text-base font-medium">Quantidade:</Text>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                className="w-9 h-9 rounded-full border-2 border-gray-200 items-center justify-center"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text className="text-lg font-bold">−</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold w-8 text-center">{quantity}</Text>
              <TouchableOpacity
                className="w-9 h-9 rounded-full border-2 border-gray-200 items-center justify-center"
                onPress={() => setQuantity(Math.min(99, quantity + 1))}
              >
                <Text className="text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="bg-green-500 py-4 rounded-full mt-6"
            onPress={handleAdd}
          >
            <Text className="text-white text-center font-bold text-lg">🛒 Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}