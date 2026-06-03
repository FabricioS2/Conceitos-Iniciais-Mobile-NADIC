import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import ProductCard from '../../components/ProductCard';
import { useState, useMemo } from 'react';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !selectedCategory || p.category === selectedCategory;
      const normSearch = searchTerm.trim() ? normalize(searchTerm.trim()) : '';
      const matchSearch = !normSearch ||
        normalize(p.name).includes(normSearch) ||
        normalize(p.category).includes(normSearch);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleQuickAdd = (product: Product) => {
    addItem(product);
    showToast(`${product.emoji} ${product.name} adicionado!`, 'success');
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Barra de pesquisa */}
      <View className="px-4 pt-3 pb-2">
        <TextInput
          placeholder="Buscar produtos..."
          className="bg-white border-2 border-gray-200 rounded-full px-4 py-2 text-base"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filtros de categoria */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-3"
        contentContainerStyle={{ gap: 8 }}
      >
        {categories.map((cat) => {
          const active = cat.filter === selectedCategory || (!cat.filter && !selectedCategory);
          return (
            <TouchableOpacity
              key={cat.name}
              className={`rounded-full px-4 py-2 border-2 ${
                active ? 'bg-green-500 border-green-500' : 'bg-white border-gray-200'
              }`}
              onPress={() => setSelectedCategory(cat.filter || null)}
            >
              <Text className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-700'}`}>
                {cat.emoji} {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contagem de produtos */}
      <View className="flex-row justify-between items-center px-4 mb-2">
        <Text className="text-lg font-bold text-gray-800">
          {selectedCategory || 'Todos os Produtos'}
        </Text>
        <Text className="text-xs text-gray-500">{filteredProducts.length} itens</Text>
      </View>

      {/* Grade de produtos */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard product={item} onQuickAdd={handleQuickAdd} />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-6xl mb-4">🔎</Text>
          <Text className="text-xl font-bold text-gray-500">Nenhum produto encontrado</Text>
          <Text className="text-sm text-gray-400 mt-1">Tente ajustar sua busca ou limpar os filtros.</Text>
        </View>
      )}
    </View>
  );
}

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}