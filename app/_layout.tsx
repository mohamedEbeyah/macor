import { ApolloProvider } from '@apollo/client';

import { Slot } from 'expo-router';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import client from '../src/apolloClient';
import '../src/i18n/i18n';
import { persistor, store } from '../store/store';
export default function Layout() {
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Slot />
      </PersistGate>
    </Provider>
    </ApolloProvider>
  )
}