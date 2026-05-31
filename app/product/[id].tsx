import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <View className="flex-1 bg-white p-4">
        <Image
          source={{ uri: product.image }}
          className="w-full h-64 rounded-xl"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold mt-4 text-gray-900">{product.name}</Text>
        <Text className="text-xl text-green-700 font-semibold mt-2">
          R$ {product.price.toFixed(2)}
        </Text>
        {product.description && (
          <Text className="text-base text-gray-600 mt-3">{product.description}</Text>
        )}

        <TouchableOpacity
          className="bg-green-600 py-3 rounded-xl mt-8"
          onPress={() => {
            addItem(product);
            router.back(); // opcional: voltar após adicionar
          }}
        >
          <Text className="text-white text-center font-bold text-lg">
            Adicionar ao carrinho
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}