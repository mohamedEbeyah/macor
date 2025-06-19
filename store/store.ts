import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';

// ✅ Good: Clean and modular store configuration
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  // ⚠️ Suggestion: If you're building an app where cart or product state
  // should survive a full reload , or you want to save connected user token ,, ect
  // consider integrating redux-persist here to persist that state to localStorage/AsyncStorage.
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
