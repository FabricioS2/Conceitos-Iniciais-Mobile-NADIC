import { View, Text, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../hooks/useCart';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <View className="flex-row bg-white rounded-xl p-3 mb-3 shadow-sm items-center">
      <View className="w-16 h-16 items-center justify-center bg-green-50 rounded-lg">
        <Text className="text-3xl">{product.emoji}</Text>
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>{product.name}</Text>
        <Text className="text-sm text-gray-500">R$ {product.price.toFixed(2)} /{product.unit}</Text>
        <Text className="text-sm font-bold text-gray-600 mt-1">Subtotal: R$ {subtotal.toFixed(2)}</Text>
      </View>
      <View className="flex-row items-center mr-2">
        <TouchableOpacity
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(product.id, quantity - 1)}
        >
          <Text className="text-lg font-bold">−</Text>
        </TouchableOpacity>
        <Text className="mx-2 text-lg font-bold">{quantity}</Text>
        <TouchableOpacity
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(product.id, Math.min(quantity + 1, 99))}
        >
          <Text className="text-lg font-bold">+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-red-100 p-2 rounded-full"
        onPress={() => removeItem(product.id)}
      >
        <Text className="text-red-600 font-bold">🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}