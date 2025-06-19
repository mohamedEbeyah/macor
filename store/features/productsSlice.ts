import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Good start with createAsyncThunk for async action
// ❗️You’re using createAsyncThunk for fetching products, which works,
// but this logic could be greatly simplified using RTK Query (`createApi`).
// RTK Query automatically handles:
// - Caching
// - Loading and error states
// - Auto-generated hooks (e.g., `useGetProductsQuery()`)
// - Less boilerplate and better scalability


export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }

);

// ✅ Well-defined type for Product
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// ✅ Clean and simple product state interface
interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

// ✅ Good use of initialState
const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ✅ Handling loading state correctly
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // ✅ Updating items on success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      // ✅ Graceful fallback on error
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      });
  },
});

export default productsSlice.reducer;
