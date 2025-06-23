import { gql, useQuery } from '@apollo/client';
import * as Localization from 'expo-localization';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { addToCart } from '../store/features/cartSlice';
import { setLanguage } from '../store/features/langSlice';

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  // Always call hooks outside of any conditions
  useEffect(() => {
    const locale = Localization.locale.split('-')[0]; // e.g. "en-US" -> "en"
    dispatch(setLanguage(locale));
  }, []);

  const products = data?.products?.edges.map((edge: { node: any; }) => edge.node) || [];
  const currentLang = useSelector((state: RootState) => state.language.language);
  const handleAddToCart = (product: {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
  }) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <View className="flex-1 bg-white p-4">
      {loading && <Text>{t('loading') || 'Loading...'}</Text>}
      {error && <Text>{t('error') || 'Error loading products'}</Text>}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const price = item.pricing?.priceRange?.start?.gross?.amount ?? 0;
            return (
              
              <View className="mb-4 bg-white p-3 rounded-lg shadow">
                <Image source={{ uri: item.thumbnail?.url }} className="w-20 h-20" resizeMode="contain" />
                <Text className="font-bold text-black">{item.name}</Text>
                <Text className="text-black mb-2">${price.toFixed(2)}</Text>
                <Pressable
                  className="bg-blue-600 rounded-lg py-2"
                  onPress={() =>
                    handleAddToCart({
                      id: item.id,
                      name: item.name,
                      thumbnail: item.thumbnail?.url ?? '',
                      price,
                    })
                  }
                />
                <Text className="text-white text-center font-semibold">
  Current Language: {currentLang.toUpperCase()}
</Text>


              </View>
              
            );
          }}
        />
      )}
<Text className="mt-4">
  Current Language: {currentLang.toUpperCase()}
</Text><View className="mb-4 bg-white p-3 rounded-lg shadow">
  <Button title="EN" onPress={() => dispatch(setLanguage('en'))} />
  <Button title="FR" onPress={() => dispatch(setLanguage('fr'))} />
  <Button title="AR" onPress={() => dispatch(setLanguage('ar'))} />
</View>
      <Button title={t('goToCart') || 'Go to Cart'} onPress={() => router.push('/cart')} />
    </View>
    
  );
}


