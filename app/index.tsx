import CameraPicker from "@/components/CameraPicker";
import MapLocation from "@/components/MapLocation";
import { gql, useQuery } from '@apollo/client';
import * as Localization from 'expo-localization';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  const currentLang = useSelector((state: RootState) => state.language.language);

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    const locale = Localization.locale.split('-')[0]; // e.g. en-US -> en
    dispatch(setLanguage(locale));
  }, []);

  const products = data?.products?.edges.map((edge: { node: any }) => edge.node) || [];

  const handleAddToCart = (product: {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
  }) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <View className="flex-1 bg-white px-4 py-6">
      {loading && <Text className="text-center text-gray-500">{t('loading') || 'Loading...'}</Text>}
      {error && <Text className="text-center text-red-500">{t('error') || 'Error loading products'}</Text>}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          className="mb-4"
          renderItem={({ item }) => {
            const price = item.pricing?.priceRange?.start?.gross?.amount ?? 0;
            return (
              <View className="mb-4 bg-white p-4 rounded-xl shadow-md flex-row items-center space-x-4">
                <Image source={{ uri: item.thumbnail?.url }} className="w-20 h-20 rounded-lg" resizeMode="contain" />
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-black">{item.name}</Text>
                  <Text className="text-gray-600">${price.toFixed(2)}</Text>
                  <Pressable
                    className="mt-2 bg-blue-600 py-2 px-4 rounded-lg"
                    onPress={() =>
                      handleAddToCart({
                        id: item.id,
                        name: item.name,
                        thumbnail: item.thumbnail?.url ?? '',
                        price,
                      })
                    }
                  >
                    <Text className="text-white text-center font-medium">{t('addToCart') || 'Add to Cart'}</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}

      <Text className="text-center font-medium text-gray-700 mb-2">
        {t('currentLanguage') || 'Current Language'}: {currentLang.toUpperCase()}
      </Text>

      <View className="flex-row justify-around mb-6">
        <Pressable onPress={() => dispatch(setLanguage('en'))} className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text className="text-black font-semibold">EN</Text>
        </Pressable>
        <Pressable onPress={() => dispatch(setLanguage('fr'))} className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text className="text-black font-semibold">FR</Text>
        </Pressable>
        <Pressable onPress={() => dispatch(setLanguage('ar'))} className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text className="text-black font-semibold">AR</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.push('/cart')}
        className="bg-green-600 py-3 rounded-xl mb-4"
      >
        <Text className="text-white text-center font-semibold text-base">
          {t('goToCart') || 'Go to Cart'}
        </Text>
      </Pressable>

      <CameraPicker />
      <MapLocation />
    </View>
  );
}
