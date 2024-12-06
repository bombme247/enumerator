import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ValuesState {
  minValue: string;
  maxValue: string;
  isIncorrectValue: boolean;
  valuesSet: boolean;
  count: number;
}

const initialState: ValuesState = {
  minValue: localStorage.getItem('storedMinValue') || '0',
  maxValue: localStorage.getItem('storedMaxValue') || '0',
  isIncorrectValue: false,
  valuesSet: false,
  count: Number(localStorage.getItem('storedMinValue')) || 0,
};

const valuesSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    setMinValue: (state, action: PayloadAction<string>) => {
      state.minValue = action.payload;
    },
    setMaxValue: (state, action: PayloadAction<string>) => {
      state.maxValue = action.payload;
    },
    setIsIncorrectValue: (state, action: PayloadAction<boolean>) => {
      state.isIncorrectValue = action.payload;
    },
    setValuesSet: (state, action: PayloadAction<boolean>) => {
      state.valuesSet = action.payload;
    },
    increaseCount: (state) => {
      if (state.count < Number(state.maxValue)) {
        state.count += 1
      } 
    },
    resetCount: (state) => {
      state.count = Number(state.minValue) || 0
    }

  },
});

export const { setMinValue, setMaxValue, setIsIncorrectValue, setValuesSet, increaseCount, resetCount } = valuesSlice.actions;
export default valuesSlice.reducer;
