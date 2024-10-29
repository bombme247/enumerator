import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"

type SettingWindowPropsType = {
  onSetValues: (min: number, max: number) => void
  setIsIncorrectValue: (value: boolean) => void
}

export const SettingWindow = ({onSetValues, setIsIncorrectValue}: SettingWindowPropsType) => {

  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(0)
  
  useEffect(() => {
    const storedMinValue = Number(localStorage.getItem('storedMinValue'));
    const storedMaxValue = Number(localStorage.getItem('storedMaxValue'));
      if (!isNaN(storedMinValue) && !isNaN(storedMaxValue)) {
      setMinValue(storedMinValue);
      setMaxValue(storedMaxValue);
    }

  }, [])

  const checkError = useCallback( (min: number, max: number) => {
    setIsIncorrectValue(min < 0 || max < 0 || min >= max);
  }, [setIsIncorrectValue] );

  const minChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement> ) => {
    const newMinValue = Number(event.currentTarget.value)
    setMinValue(newMinValue)
    checkError(newMinValue, maxValue)
  }, [checkError, maxValue] );

  const maxChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement> ) => {
    const newMaxValue = Number(event.currentTarget.value)
    setMaxValue(newMaxValue)
    checkError(minValue, newMaxValue)
  }, [checkError, minValue] );

  const settingSaveHandler = useCallback( () => {
    onSetValues(minValue, maxValue)
  }, [onSetValues, minValue, maxValue] );
 
  const isIncorrectValue = minValue < 0 || maxValue < 0 || minValue >= maxValue 

  return (
    <div className="container">
      <div className="counter">
        <Input id={'max'} type={'number'} onChange={maxChangeHandler} value={maxValue} className={isIncorrectValue ? 'error': ''} label={'max value:'} />
        <Input id={'min'} type={'number'} onChange={minChangeHandler} value={minValue} className={isIncorrectValue ? 'error': ''} label={'start value:'} />
      </div>

      <div className="btn-wrapper">
        <Button title={'set'} onClickHandler={settingSaveHandler} disabled={isIncorrectValue}/>
      </div>
    </div>
  )
}