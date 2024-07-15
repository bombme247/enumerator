import { ChangeEvent, useEffect, useState } from "react"
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
    setMinValue(storedMinValue);
    setMaxValue(storedMaxValue);
  }, [])

  const minChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
    const newMinValue = Number(event.currentTarget.value)
    setMinValue(newMinValue)
    checkError(newMinValue, maxValue)
  }

  const maxChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
    const newMaxValue = Number(event.currentTarget.value)
    setMaxValue(newMaxValue)
    checkError(minValue, newMaxValue)
  }

  const settingSaveHandler = () => {
    onSetValues(minValue, maxValue)
  }

  const checkError = (min: number, max: number) => {
    setIsIncorrectValue(min < 0 || max < 0 || min === max ||min > max);
  }

  const isIncorrectValue = minValue < 0 || maxValue < 0 || minValue === maxValue ||minValue > maxValue

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