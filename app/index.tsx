import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/features/cartSlice';
import { fetchProducts } from '../store/features/productsSlice';
import { RootState } from '../store/store';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // ✅ Fetching products on mount — good
    // ⚠️ Consider adding a check to avoid duplicte fetches (if cached)
    //  Or use RTK query wWhich does that for you 
    dispatch(fetchProducts());
 
  }, []);

  // ⚠️ Suggestion: avoid using `any` for product. Use the proper `Product` interface from your types.
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (loading) return <Text>Loading products...</Text>; // ✅ Simple feedback
  if (error) return <Text>Error: {error}</Text>;         // ✅ Error display

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      // ✅ Nice use of FlatList for performance
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* ✅ Good UI structure */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>

          <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />

        
          <Link href="/cart">
            <Text>🛒 Go to Cart</Text>
          </Link>
        </View>
      )}
    />
  );
}

// ✅ Styles are clear and readable
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
