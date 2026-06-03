import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/CartItem';
import { useToast } from '../../context/ToastContext';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, total, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const subtotal = total;
  const shipping = subtotal >= 100 ? 0 : 12.90;
  const finalTotal = subtotal + shipping;

  const handleClearCart = () => {
    Alert.alert('Limpar carrinho', 'Tem certeza que deseja remover todos os itens?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', onPress: () => { clearCart(); showToast('Carrinho esvaziado.', 'warning'); }, style: 'destructive' },
    ]);
  };

  const handleCheckout = () => {
    Alert.alert(
      '🛒 Pedido Finalizado!',
      `Itens: ${items.reduce((s, i) => s + i.quantity, 0)}\nSubtotal: R$ ${subtotal.toFixed(2)}\nFrete: ${shipping === 0 ? 'Grátis' : 'R$ ' + shipping.toFixed(2)}\nTotal: R$ ${finalTotal.toFixed(2)}\n\nObrigado! 🎉`,
      [{ text: 'OK', onPress: () => { clearCart(); router.replace('/'); showToast('Compra finalizada! 🎉'); } }]
    );
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-7xl mb-4">🛒</Text>
        <Text className="text-xl font-bold text-gray-500">Seu carrinho está vazio</Text>
        <Text className="text-gray-400 mt-1 mb-4">Que tal explorar nossos produtos?</Text>
        <TouchableOpacity
          className="bg-white border-2 border-gray-200 rounded-full px-6 py-3"
          onPress={() => router.replace('/')}
        >
          <Text className="text-gray-700 font-semibold">← Ir às Compras</Text>
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
      <View className="bg-white rounded-xl p-5 mt-4 shadow-md">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Subtotal ({items.reduce((s,i) => s + i.quantity, 0)} itens)</Text>
          <Text className="text-lg font-bold text-green-700">R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base">Frete</Text>
          <Text className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
            {shipping === 0 ? '🚚 Grátis!' : `R$ ${shipping.toFixed(2)}`}
          </Text>
        </View>
        {shipping > 0 && (
          <Text className="text-xs text-gray-400 text-right -mt-1">Frete grátis acima de R$ 100,00</Text>
        )}
        <View className="border-t border-gray-200 pt-3 mt-3 flex-row justify-between items-center">
          <Text className="text-xl font-extrabold">Total</Text>
          <Text className="text-2xl font-extrabold text-green-700">R$ {finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          className="bg-green-500 py-3 rounded-full mt-4"
          onPress={handleCheckout}
        >
          <Text className="text-white text-center font-bold text-lg">✅ Finalizar Compra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-2 border-red-500 py-3 rounded-full mt-3"
          onPress={handleClearCart}
        >
          <Text className="text-red-500 text-center font-bold">🗑️ Esvaziar Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}