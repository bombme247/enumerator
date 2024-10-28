import { useEffect, useState } from 'react';
import './App.css';
import { Enumerator } from './components/Enumerator';
import { SettingWindow } from './components/SettingWindow';

function App() {

  const [minValue, setMinValue] = useState( () => {
    const storedMin = localStorage.getItem('storedMinValue');
    return storedMin !== null ? Number(storedMin) : 0;
  } )

  const [maxValue, setMaxValue] = useState( () => {
    const storedMax = localStorage.getItem('storedMaxValue');
    return storedMax !== null ? Number(storedMax) : 0;
  } )

  const [isIncorrectValue, setIsIncorrectValue] = useState<boolean>(false)
  const [valuesSet, setValuesSet] = useState<boolean>(false);
  const [isStorageEmpty, setIsStorageEmpty] = useState<boolean>(true)

  useEffect( () => {

    const storedMinValue = Number(localStorage.getItem('storedMinValue'));
    const storedMaxValue = Number(localStorage.getItem('storedMaxValue'));

    if ((storedMinValue !== 0) && (storedMaxValue !== 0)) {
      setMinValue(storedMinValue);
      setMaxValue(storedMaxValue);
      setValuesSet(true);
      setIsStorageEmpty(false); //false если значения найдены
    } else {
      setIsStorageEmpty(true); //true если значения отсутствуют
    }

  }, [] );
  

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
      <Enumerator minValue={minValue} maxValue={maxValue} isIncorrectValue={isIncorrectValue} isStorageEmpty={isStorageEmpty} valuesSet={valuesSet}/>
    </div>
  );
}

export default App;
