// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ValuesState {
//   minValue: string;
//   maxValue: string;
//   isIncorrectValue: boolean;
//   valuesSet: boolean;
//   count: number;
// }

// const initialState: ValuesState = {
//   minValue: localStorage.getItem('storedMinValue') || '0',
//   maxValue: localStorage.getItem('storedMaxValue') || '0',
//   isIncorrectValue: false,
//   valuesSet: false,
//   count: Number(localStorage.getItem('storedMinValue')) || 0,
// };

// const valuesSlice = createSlice({
//   name: 'values',
//   initialState,
//   reducers: {
//     setMinValue: (state, action: PayloadAction<string>) => {
//       state.minValue = action.payload;
//     },
//     setMaxValue: (state, action: PayloadAction<string>) => {
//       state.maxValue = action.payload;
//     },
//     setIsIncorrectValue: (state, action: PayloadAction<boolean>) => {
//       state.isIncorrectValue = action.payload;
//     },
//     setValuesSet: (state, action: PayloadAction<boolean>) => {
//       state.valuesSet = action.payload;
//     },
//     increaseCount: (state) => {
//       if (state.count < Number(state.maxValue)) {
//         state.count += 1
//       } 
//     },
//     resetCount: (state) => {
//       state.count = Number(state.minValue) || 0
//     }

//   },
// });

// export const { setMinValue, setMaxValue, setIsIncorrectValue, setValuesSet, increaseCount, resetCount } = valuesSlice.actions;
// export default valuesSlice.reducer;



// ------------------------версия с AC ------------------

const SET_MIN_VALUE = "SET_MIN_VALUE"
const SET_MAX_VALUE = "SET_MAX_VALUE"
const SET_IS_INCORRECT_VALUE = "SET_IS_INCORRECT_VALUE"
const SET_VALUES_SET = "SET_VALUES_SET"
const INCREASE_COUNT = "INCREASE_COUNT"
const RESET_COUNT = "RESET_COUNT"

interface ValueState {
  minValue: string;
  maxValue: string;
  isIncorrectValue: boolean;
  valuesSet: boolean;
  count: number;
}

const initialState = {
  minValue: localStorage.getItem('storedMinValue') || '0',
  maxValue: localStorage.getItem('storedMaxValue') || '0',
  isIncorrectValue: false,
  valuesSet: false,
  count: Number(localStorage.getItem('storedMinValue')) || 0,
}

export const valueReducer = (state = initialState, action: ValueActions) : ValueState => {
  switch (action.type) {
    case SET_MIN_VALUE:
      return { ...state, minValue: action.payload };
    case SET_MAX_VALUE:
      return { ...state, maxValue: action.payload };
    case SET_IS_INCORRECT_VALUE:
      return { ...state, isIncorrectValue: action.payload };
    case SET_VALUES_SET:
      return { ...state, valuesSet: action.payload };
    case INCREASE_COUNT:
      if (state.count < Number(state.maxValue)) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case RESET_COUNT:
      return { ...state, count: Number(state.minValue) || 0 };
    default:
      return state;
  }
}

export const setMinValueAC = (payload: string) => ({ type: SET_MIN_VALUE, payload } as const)
export const setMaxValueAC = (payload: string) => ({ type: SET_MAX_VALUE, payload } as const)
export const setIsIncorrectValueAC = (payload: boolean) => ({ type: SET_IS_INCORRECT_VALUE, payload } as const)
export const setValuesSetAC = (payload: boolean) => ({ type: SET_VALUES_SET, payload } as const)
export const increaseCountAC = () => ({ type: INCREASE_COUNT } as const)
export const resetCountAC = () => ({ type: RESET_COUNT } as const)

export type ValueActions = 
| ReturnType<typeof setMinValueAC>
| ReturnType<typeof setMaxValueAC>
| ReturnType<typeof setIsIncorrectValueAC>
| ReturnType<typeof setValuesSetAC>
| ReturnType<typeof increaseCountAC>
| ReturnType<typeof resetCountAC>
