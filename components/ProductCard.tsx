import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '../types';

interface Props {
  product: Product;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({ product, onQuickAdd }: Props) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity className="bg-white rounded-xl mb-3 w-[48%] shadow-sm overflow-hidden">
        <View className="bg-green-50 h-32 items-center justify-center relative">
          {product.onSale && (
            <View className="absolute top-2 left-2 bg-yellow-500 px-2 py-0.5 rounded-full z-10">
              <Text className="text-xs font-bold text-white">🔥 OFERTA</Text>
            </View>
          )}
          <Text className="text-5xl">{product.emoji}</Text>
        </View>
        <View className="p-3">
          <Text className="text-xs text-gray-500 uppercase font-semibold">{product.category}</Text>
          <Text className="text-sm font-bold text-gray-800 mt-1" numberOfLines={2}>{product.name}</Text>
          <Text className="text-lg font-extrabold text-green-700 mt-1">
            R$ {product.price.toFixed(2)} <Text className="text-xs font-medium text-gray-500">/{product.unit}</Text>
          </Text>
          <TouchableOpacity
            className="mt-2 py-2 rounded-lg border-2 border-green-500 items-center"
            onPress={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
          >
            <Text className="text-green-700 font-bold text-sm">🛒 Adicionar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
}