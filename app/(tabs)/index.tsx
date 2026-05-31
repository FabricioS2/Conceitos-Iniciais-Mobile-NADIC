import { View, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        columnWrapperClassName="justify-between"
      />
    </View>
  );
}