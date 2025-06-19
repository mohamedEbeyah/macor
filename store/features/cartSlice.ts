import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents a single item in the cart.
 */
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

/**
 * Cart state structure.
 */
interface CartState {
  items: CartItem[];
}

// ✅ Clean and minimal initial state definition.
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    /**
     * ✅ Good logic: Checks if the item already exists in cart.
     */
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    /**
     * ✅ Clean filtering logic to remove an item by ID.
     */
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// ✅ Good export structure
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
