import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <View className="bg-white rounded-xl p-3 mb-4 w-[48%] shadow-md">
      <Link href={`/product/${product.id}`}>
        <Image
          source={{ uri: product.image }}
          className="w-full h-32 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold mt-2 text-gray-800" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-lg font-semibold text-green-700 mt-1">
          R$ {product.price.toFixed(2)}
        </Text>
      </Link>
      <TouchableOpacity
        className="bg-green-600 py-2 rounded-lg mt-2"
        onPress={() => addItem(product)}
      >
        <Text className="text-white text-center font-bold">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}