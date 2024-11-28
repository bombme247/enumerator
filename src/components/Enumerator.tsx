// import { useEffect, useState } from "react"
// import { Button } from "./Button"

// type EnumeratorPropsType = {
//   minValue: number
//   maxValue: number
//   isIncorrectValue: boolean
//   isStorageEmpty: boolean
//   valuesSet: boolean
// }

// export const Enumerator = ({minValue, maxValue, isIncorrectValue, isStorageEmpty, valuesSet}: EnumeratorPropsType) => {

//   const initialCount = isStorageEmpty 
//   ? minValue 
//   : Number(localStorage.getItem('storedMinValue') || minValue);

//   let [count, setCount] = useState<number>(initialCount)

//   useEffect(() => {
//     setCount(minValue);
//   }, [minValue])

//   const resetCount = () => setCount(minValue)

//   const increaseCount = () => setCount(count +1) 
  
//   const isMaxCount = count === maxValue
//   const isMinCount = count === minValue


//   const displayMessage =  isStorageEmpty && isIncorrectValue
//   ? 'Incorrect value'
//   : isStorageEmpty
//   ? 'Enter values and press `set`'
//   : isIncorrectValue 
//   ? 'Incorrect value'
//   : !valuesSet
//   ? 'Enter values and press `set`'
//   : count;

//   return (
//     <div className="container">
//         <div className={isStorageEmpty || !valuesSet || !isMaxCount ? 'counter' : 'max-count' }>
//           {displayMessage}
//         </div>
//         <div className='btn-wrapper'>
//           <Button title={'increase'} onClickHandler={increaseCount} disabled={isMaxCount || isIncorrectValue || !valuesSet}/>
//           <Button title={'reset'} onClickHandler={resetCount} disabled={isMinCount || isIncorrectValue || !valuesSet} />
//         </div>
//       </div>
//   )
// }

import { useEffect, useState } from "react";
import { Button } from "./Button";

type EnumeratorPropsType = {
  minValue: string;
  maxValue: string;
  isIncorrectValue: boolean;
  isStorageEmpty: boolean;
  valuesSet: boolean;
};

export const Enumerator = ({ minValue, maxValue, isIncorrectValue, isStorageEmpty, valuesSet }: EnumeratorPropsType) => {
  const initialCount = isStorageEmpty
    ? 0 // Если хранилище пустое, начинаем с нуля
    : Number(minValue) || 0; // Если minValue пустое, тоже начинаем с нуля

  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    // Сбрасываем значение, если minValue меняется
    const newMinValue = Number(minValue) || 0; // Пустое значение интерпретируем как 0
    setCount(newMinValue);
  }, [minValue]);

  const resetCount = () => setCount(Number(minValue) || 0); // Сброс к минимальному значению

  const increaseCount = () => {
    const maxNum = Number(maxValue) || 0; // Пустое значение интерпретируем как 0
    if (count < maxNum) {
      setCount(count + 1);
    }
  };

  const isMaxCount = count === Number(maxValue);
  const isMinCount = count === (Number(minValue) || 0);

  // const displayMessage =
  //   isStorageEmpty && isIncorrectValue
  //     ? "Incorrect value"
  //     : isStorageEmpty
  //     ? "Enter values and press `set`"
  //     : isIncorrectValue
  //     ? "Incorrect value"
  //     : !valuesSet
  //     ? "Enter values and press `set`"
  //     : count;
  const displayMessage = (() => {
    if (isIncorrectValue) return "Incorrect value";
    if (!valuesSet) return "Enter values and press `set`";
    return count;
  })();

  return (
    <div className="container">
      <div className={isStorageEmpty || !valuesSet || !isMaxCount ? "counter" : "max-count"}>
        {displayMessage}
      </div>
      <div className="btn-wrapper">
        <Button
          title={"increase"}
          onClickHandler={increaseCount}
          disabled={isMaxCount || isIncorrectValue || !valuesSet}
        />
        <Button
          title={"reset"}
          onClickHandler={resetCount}
          disabled={isMinCount || isIncorrectValue || !valuesSet}
        />
      </div>
    </div>
  );
};
