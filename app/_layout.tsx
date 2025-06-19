// app/_layout.tsx
import { Slot } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../store/store'

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Slot />
      </PersistGate>
    </Provider>
  )
}
