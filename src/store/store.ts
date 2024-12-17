// import { configureStore } from '@reduxjs/toolkit';
// import valuesReducer from './slices/valuesSlice';


// export const store = configureStore({
//   reducer: {
//       values: valuesReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// ------------------------версия с ридьюсерами------------------

import { valueReducer } from '././slices/valuesSlice'
import { combineReducers, legacy_createStore } from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  values: valueReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
