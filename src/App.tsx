import { useEffect, useState } from 'react';
import './App.css';
import { Enumerator } from './components/Enumerator';
import { SettingWindow } from './components/SettingWindow';

function App() {

  const [minValue, setMinValue] = useState<number | null>(() => {
    const storedMin = localStorage.getItem('storedMinValue');
    return storedMin ? Number(storedMin) : null;
  });

  const [maxValue, setMaxValue] = useState<number | null>(() => {
    const storedMax = localStorage.getItem('storedMaxValue');
    return storedMax ? Number(storedMax) : null;
  });

  const [isIncorrectValue, setIsIncorrectValue] = useState<boolean>(false);
  const [valuesSet, setValuesSet] = useState<boolean>(false);
  const [isStorageEmpty, setIsStorageEmpty] = useState<boolean>(true);

  useEffect(() => {

    const isEmpty = minValue === null || maxValue === null;
    const isIncorrect = minValue === null || maxValue === null || minValue < 0 || maxValue < 0 || minValue >= maxValue;

    setIsStorageEmpty(isEmpty);
    setIsIncorrectValue(isIncorrect)

  }, [minValue, maxValue]);

  const handleSetValues = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max)

    localStorage.setItem('storedMinValue', min.toString());
    localStorage.setItem('storedMaxValue', max.toString());

    setValuesSet(true);
    setIsStorageEmpty(false);
  }

  return (
    <div className="App">
      <SettingWindow onSetValues={handleSetValues} setIsIncorrectValue={setIsIncorrectValue} />
      <Enumerator minValue={minValue || 0} maxValue={maxValue || 0} isIncorrectValue={isIncorrectValue} isStorageEmpty={isStorageEmpty} valuesSet={valuesSet} />
    </div>
  );
}

export default App;
