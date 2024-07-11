import { useState } from "react"
import { Button } from "./Button"

export const Enumerator = () => {
  let [count, setCount] = useState(0)
  
  const resetCount = () => {
    setCount(count = 0)
  }

  const increaseCount = () => {
   setCount(count +1)
  }

  
  const isMaxCount = count === 5
  const isZeroCount = count === 0


  return (
    <div className="container">
        <div className={isMaxCount ? 'max-count' : 'counter'}>{count}</div>
        <div className='btn-wrapper'>
          <Button title={'increase'} onClickHandler={increaseCount} disabled={isMaxCount}/>
          <Button title={'reset'} onClickHandler={resetCount} disabled={isZeroCount} />
        </div>
      </div>
  )
}