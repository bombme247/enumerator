import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';

type EnumeratorPropsType = {
  minValue: string;
  maxValue: string;
  isIncorrectValue: boolean;
  isStorageEmpty: boolean;
  valuesSet: boolean;
};

export const Enumerator = () => {

  const dispatch = useDispatch();
  const { minValue, maxValue, isIncorrectValue, valuesSet } = useSelector((state: RootState) => state.values);

  const [count, setCount] = useState<number>(Number(minValue));

  const resetCount = () => setCount(Number(minValue) || 0); 

  const increaseCount = () => {
    const maxNum = Number(maxValue) || 0; 
    if (count < maxNum) {
      setCount(count + 1);
    }
  };

  const isMaxCount = count === Number(maxValue);
  const isMinCount = count === (Number(minValue) || 0);

  const displayMessage = (() => {
    if (isIncorrectValue) return "Incorrect value";
    if (!valuesSet) return "Enter values and press `set`";
    return count;
  })();

  return (
    <div className="container">
      <div className={!valuesSet || !isMaxCount ? "counter" : "max-count"}>
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
