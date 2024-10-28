import { useEffect, useState } from "react"
import { Button } from "./Button"

type EnumeratorPropsType = {
  minValue: number
  maxValue: number
  isIncorrectValue: boolean
  isStorageEmpty: boolean
  valuesSet: boolean
}

export const Enumerator = ({minValue, maxValue, isIncorrectValue, isStorageEmpty, valuesSet}: EnumeratorPropsType) => {

  const initialCount = isStorageEmpty ? minValue : Number(localStorage.getItem('storedMinValue') || minValue);
  let [count, setCount] = useState<number>(initialCount)

  useEffect(() => {
    setCount(minValue);
  }, [minValue])

  const resetCount = () => {
    setCount(minValue)
  }

  const increaseCount = () => {
   setCount(count +1)
  }
  
  const isMaxCount = count === maxValue
  const isMinCount = count === minValue

  return (
    <div className="container">
        <div className={isMaxCount ? 'max-count' : 'counter'}>
          {isStorageEmpty 
          ? 'Enter values and press `set`'
          : isIncorrectValue 
          ? 'Incorrect value'
          : !valuesSet
          ? 'Enter values and press `set`'
          : count}
        </div>
        <div className='btn-wrapper'>
          <Button title={'increase'} onClickHandler={increaseCount} disabled={isMaxCount || isIncorrectValue || !valuesSet}/>
          <Button title={'reset'} onClickHandler={resetCount} disabled={isMinCount || isIncorrectValue || !valuesSet} />
        </div>
      </div>
  )
}