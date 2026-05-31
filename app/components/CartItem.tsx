import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../hooks/useCart';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <View className="flex-row bg-white rounded-xl p-3 mb-3 shadow-sm items-center">
      <Image
        source={{ uri: product.image }}
        className="w-16 h-16 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-sm text-green-700">
          R$ {product.price.toFixed(2)} un.
        </Text>
        <Text className="text-sm font-bold text-gray-600 mt-1">
          Subtotal: R$ {(product.price * quantity).toFixed(2)}
        </Text>
      </View>

      {/* Controles de quantidade */}
      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(product.id, quantity - 1)}
        >
          <Text className="text-lg font-bold">-</Text>
        </TouchableOpacity>
        <Text className="mx-2 text-lg font-bold">{quantity}</Text>
        <TouchableOpacity
          className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          onPress={() => updateQuantity(product.id, quantity + 1)}
        >
          <Text className="text-lg font-bold">+</Text>
        </TouchableOpacity>
      </View>

      {/* Botão remover */}
      <TouchableOpacity
        className="ml-3 bg-red-100 p-2 rounded-full"
        onPress={() => removeItem(product.id)}
      >
        <Text className="text-red-600 font-bold">🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}