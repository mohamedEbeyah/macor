import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from "../store/features/cartSlice";
import { RootState } from '../store/store';

export default function CartScreen() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button title="Remove" onPress={() => handleRemove(item.id)} />
            </View>
            <View><Button title="Go to Home" onPress={() => router.push('/')} /></View>
          </View>
          
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  total: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
