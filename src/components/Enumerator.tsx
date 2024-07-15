import { useEffect, useState } from "react"
import { Button } from "./Button"

type EnumeratorPropsType = {
  minValue: number
  maxValue: number
  isIncorrectValue: boolean
  valuesSet: boolean
}

export const Enumerator = ({minValue, maxValue, isIncorrectValue, valuesSet}: EnumeratorPropsType) => {

  let [count, setCount] = useState<number>(minValue)

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
          {isIncorrectValue ? 'incorrect value' : (!valuesSet ? 'enter values and press `set`' : count)}
        </div>
        <div className='btn-wrapper'>
          <Button title={'increase'} onClickHandler={increaseCount} disabled={isMaxCount || isIncorrectValue || !valuesSet}/>
          <Button title={'reset'} onClickHandler={resetCount} disabled={isMinCount || isIncorrectValue || !valuesSet} />
        </div>
      </div>
  )
}