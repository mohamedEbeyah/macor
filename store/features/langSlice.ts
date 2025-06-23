import i18n from '@/src/i18n/i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LangState {
  language: string;
}

const initialState: LangState = {
  language: i18n.language || 'en',
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
