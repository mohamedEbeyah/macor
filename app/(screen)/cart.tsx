 import { useRouter } from 'expo-router';
import { Button, FlatList, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../store/features/cartSlice';
import { RootState } from '../../store/store';

export default function CartScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


 


  if (cartItems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-black">Your cart is empty.</Text>
        <Button title="Back to Home" onPress={() => router.push('/')} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}

        renderItem={({ item }) => (
          <View className="flex-row gap-3 mb-4 bg-white p-3 rounded-lg shadow">
            <Image source={{ uri: item.thumbnail }} className="w-20 h-20" resizeMode="contain" />
            <View className="flex-1">
              <Text className="font-bold text-black">{item.name}</Text>
              <Text className="text-black">Price: ${item.price}</Text>
              <Text className="text-black">Quantity: {item.quantity}</Text>
              <Button title="Remove" onPress={() => dispatch(removeFromCart(item.id))} />
            </View>
          </View>
        )}
      />
      <Text className="mt-4">Total: ${total.toFixed(2)}</Text>
      <Button title="Back to Home" onPress={() => router.push('/')} />
    </View>
  );
}
