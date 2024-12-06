import { useState } from "react";
import { Button } from "./Button";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from "react-redux";
import { increaseCount, resetCount } from "../store/slices/valuesSlice";

// type EnumeratorPropsType = {
//   minValue: string;
//   maxValue: string;
//   isIncorrectValue: boolean;
//   isStorageEmpty: boolean;
//   valuesSet: boolean;
// };

export const Enumerator = () => {
  const dispatch = useDispatch()

  const { minValue, maxValue, isIncorrectValue, valuesSet, count } = useSelector((state: RootState) => state.values);

  const increment = () => dispatch(increaseCount())
  const reset = () => dispatch(resetCount())

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
          onClickHandler={increment}
          disabled={isMaxCount || isIncorrectValue || !valuesSet}
        />
        <Button
          title={"reset"}
          onClickHandler={reset}
          disabled={isMinCount || isIncorrectValue || !valuesSet}
        />
      </div>
    </div>
  );
};
