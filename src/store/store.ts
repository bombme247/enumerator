import { configureStore } from '@reduxjs/toolkit';
import valuesReducer from './slices/valuesSlice';


export const store = configureStore({
  reducer: {
      values: valuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
