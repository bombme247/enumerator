// import { ChangeEvent, useCallback, useEffect, useState } from "react"
// import { Button } from "./Button"
// import { Input } from "./Input"

// type SettingWindowPropsType = {
//   onSetValues: (min: number, max: number) => void
//   setIsIncorrectValue: (value: boolean) => void
// }

// export const SettingWindow = ({onSetValues, setIsIncorrectValue}: SettingWindowPropsType) => {

//   const [minValue, setMinValue] = useState<number>(0)
//   const [maxValue, setMaxValue] = useState<number>(0)
  
//   useEffect(() => {
//     const storedMinValue = Number(localStorage.getItem('storedMinValue'));
//     const storedMaxValue = Number(localStorage.getItem('storedMaxValue'));
//       if (!isNaN(storedMinValue) && !isNaN(storedMaxValue)) {
//       setMinValue(storedMinValue);
//       setMaxValue(storedMaxValue);
//     }
//   }, [])


//   const checkError = useCallback( (min: number, max: number) => {
//     setIsIncorrectValue(min < 0 || max < 0 || min >= max);
//   }, [setIsIncorrectValue] );
  
//   const minChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement> ) => {
//     const newMinValue = Number(event.currentTarget.value.trim())
//     setMinValue(newMinValue)
//     checkError(newMinValue, maxValue)
//   }, [checkError, maxValue] );

//   const maxChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement> ) => {
//     const newMaxValue = Number(event.currentTarget.value.trim())
//     setMaxValue(newMaxValue)
//     checkError(minValue, newMaxValue)
//   }, [checkError, minValue] );

//   const settingSaveHandler = useCallback( () => {
//     onSetValues(minValue, maxValue)
//   }, [onSetValues, minValue, maxValue] );
 
//   const isIncorrectValue = minValue < 0 || maxValue < 0 || minValue >= maxValue 

//   return (
//     <div className="container">
//       <div className="counter">
//         <Input id={'max'} type={'number'} onChange={maxChangeHandler} value={maxValue} className={isIncorrectValue ? 'error': ''} label={'max value:'} />
//         <Input id={'min'} type={'number'} onChange={minChangeHandler} value={minValue} className={isIncorrectValue ? 'error': ''} label={'start value:'} />
//       </div>

//       <div className="btn-wrapper">
//         <Button title={'set'} onClickHandler={settingSaveHandler} disabled={isIncorrectValue}/>
//       </div>
//     </div>
//   )
// }

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

type SettingWindowPropsType = {
  onSetValues: (min: string, max: string) => void;
  setIsIncorrectValue: (value: boolean) => void;
};

export const SettingWindow = ({ onSetValues, setIsIncorrectValue }: SettingWindowPropsType) => {
  const [minValue, setMinValue] = useState<string>('0');
  const [maxValue, setMaxValue] = useState<string>('0');

  useEffect(() => {
    const storedMinValue = localStorage.getItem('storedMinValue') || '0';
    const storedMaxValue = localStorage.getItem('storedMaxValue') || '0';
    setMinValue(storedMinValue);
    setMaxValue(storedMaxValue);
  }, []);

  const checkError = useCallback((min: string, max: string) => {
    const minNum = Number(min);
    const maxNum = Number(max);

    const hasError = !Number.isInteger(minNum) || 
      !Number.isInteger(maxNum) || 
      minNum < 0 || 
      maxNum < 0 || 
      minNum >= maxNum 

    setIsIncorrectValue(hasError)
  }, [setIsIncorrectValue]);

  const minChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newMinValue = event.currentTarget.value.trim();

    if (newMinValue === "") {
      setMinValue('');
      return checkError('', maxValue);
    }

    newMinValue = newMinValue.replace(/^0+(?=\d)/, ''); // Удаляет ведущие нули
    setMinValue(newMinValue);
    checkError(newMinValue, maxValue);
  }, [checkError, maxValue]);

  const maxChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newMaxValue = event.currentTarget.value.trim();

    if (newMaxValue === "") {
      setMaxValue('');
      return checkError(minValue, '');
    }

    newMaxValue = newMaxValue.replace(/^0+(?=\d)/, ''); // Удаляет ведущие нули
    setMaxValue(newMaxValue);
    checkError(minValue, newMaxValue);
  }, [checkError, minValue]);

  const settingSaveHandler = useCallback(() => {
    onSetValues(minValue, maxValue);
  }, [onSetValues, minValue, maxValue]);

  const isIncorrectValue = Number(minValue) < 0 || Number(maxValue) < 0 || Number(minValue) >= Number(maxValue) || !Number.isInteger(Number(minValue)) || 
  !Number.isInteger(Number(maxValue));

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
          value={getValueOrZero(maxValue)} // Преобразуем пустую строку в 0, иначе оставляем число
          className={isIncorrectValue ? 'error' : ''}
          label={'max value:'}
        />
        <Input
          id={'min'}
          type={'number'}
          onChange={minChangeHandler}
          value={getValueOrZero(minValue)} // Преобразуем пустую строку в 0, иначе оставляем число
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
