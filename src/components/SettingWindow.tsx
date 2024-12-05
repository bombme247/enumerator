import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setMinValue, setMaxValue, setIsIncorrectValue, setValuesSet } from '../store/slices/valuesSlice';

export const SettingWindow = () => {

  const dispatch = useDispatch()

  const {minValue, maxValue, isIncorrectValue} = useSelector(
    (state: RootState) => state.values
  )

  const minChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = event.target.value
    dispatch(setMinValue(newMinValue))
    validateValues(newMinValue, maxValue)
  }
  const maxChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = event.target.value
    dispatch(setMaxValue(newMaxValue))
    validateValues(minValue, newMaxValue)
  }

  const validateValues = (min: string, max: string) => {
    const minNum = Number(min);
    const maxNum = Number(max);

    const hasError = !Number.isInteger(minNum) || 
      !Number.isInteger(maxNum) || 
      minNum < 0 || 
      maxNum < 0 || 
      minNum >= maxNum 

    dispatch(setIsIncorrectValue(hasError))
  }

  const settingSaveHandler = () => {
    dispatch(setValuesSet(true))
    localStorage.setItem('storedMinValue', minValue)
    localStorage.setItem('storedMaxValue', maxValue)
  }

  // получение значений из состояния
  const getValueOrZero = (value: string) => {
    return value === '' ? '' : value; 
  }

  return (
    <div className="container">
      <div className="counter">
        <Input
          id={'max'}
          type={'number'}
          onChange={maxChangeHandler}
          value={getValueOrZero(maxValue)} 
          className={isIncorrectValue ? 'error' : ''}
          label={'max value:'}
        />
        <Input
          id={'min'}
          type={'number'}
          onChange={minChangeHandler}
          value={getValueOrZero(minValue)} 
          className={isIncorrectValue ? 'error' : ''}
          label={'start value:'}
        />
      </div>

      <div className="btn-wrapper">
        <Button title={'set'} onClickHandler={settingSaveHandler} disabled={isIncorrectValue} />
      </div>
    </div>
  );
};
