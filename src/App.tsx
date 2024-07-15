import { useState } from 'react';
import './App.css';
import { Enumerator } from './components/Enumerator';
import { SettingWindow } from './components/SettingWindow';

function App() {

  const [minValue, setMinValue] = useState(Number(localStorage.getItem('storedMinValue')))
  const [maxValue, setMaxValue] = useState(Number(localStorage.getItem('storedMaxValue')))
  const [isIncorrectValue, setIsIncorrectValue] = useState<boolean>(false)
  // const [isZeroValues, setIsZeroValues] = useState<boolean>(false)
  const [valuesSet, setValuesSet] = useState<boolean>(false);

  const handleSetValues = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max)

    localStorage.setItem('storedMinValue', min.toString());
    localStorage.setItem('storedMaxValue', max.toString());

    setValuesSet(true);
  }

  return (
    <div className="App">
      <SettingWindow onSetValues={handleSetValues} setIsIncorrectValue={setIsIncorrectValue} />
      <Enumerator minValue={minValue} maxValue={maxValue} isIncorrectValue={isIncorrectValue} valuesSet={valuesSet}/>
    </div>
  );
}

export default App;
