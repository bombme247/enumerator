// import { useEffect, useState } from 'react';
// import './App.css';
// import { Enumerator } from './components/Enumerator';
// import { SettingWindow } from './components/SettingWindow';

// function App() {

//   const [minValue, setMinValue] = useState<number >(() => {
//     const storedMin = localStorage.getItem('storedMinValue');
//     return  Number(storedMin) 
//   });

//   const [maxValue, setMaxValue] = useState<number >(() => {
//     const storedMax = localStorage.getItem('storedMaxValue');
//     return  Number(storedMax) 
//   });
  
//   const [isIncorrectValue, setIsIncorrectValue] = useState<boolean>(false);
//   const [valuesSet, setValuesSet] = useState<boolean>(false);
//   const [isStorageEmpty, setIsStorageEmpty] = useState<boolean>(true);

//   useEffect(() => {

//     const isEmpty = minValue === 0 || maxValue === 0;
//     const isIncorrect = minValue < 0 || maxValue < 0 || minValue >= maxValue;

//     setIsStorageEmpty(isEmpty)
//     setIsIncorrectValue(isIncorrect)

//   }, [minValue, maxValue]);


//   const handleSetValues = (min: number, max: number) => {
//     setMinValue(min)
//     setMaxValue(max)

//     localStorage.setItem('storedMinValue', min.toString());
//     localStorage.setItem('storedMaxValue', max.toString());

//     setValuesSet(true);
//     setIsStorageEmpty(false);
//   }

//   return (
//     <div className="App">
//       <SettingWindow onSetValues={handleSetValues} setIsIncorrectValue={setIsIncorrectValue} />
//       <Enumerator minValue={minValue || 0} maxValue={maxValue || 0} isIncorrectValue={isIncorrectValue} isStorageEmpty={isStorageEmpty} valuesSet={valuesSet} />
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from 'react';
import './App.css';
import { Enumerator } from './components/Enumerator';
import { SettingWindow } from './components/SettingWindow';

function App() {
  const [minValue, setMinValue] = useState<string>(() => {
    const storedMin = localStorage.getItem('storedMinValue') || '0';
    return storedMin;
  });

  const [maxValue, setMaxValue] = useState<string>(() => {
    const storedMax = localStorage.getItem('storedMaxValue') || '0';
    return storedMax;
  });

  const [isIncorrectValue, setIsIncorrectValue] = useState<boolean>(false);
  const [valuesSet, setValuesSet] = useState<boolean>(false);
  const [isStorageEmpty, setIsStorageEmpty] = useState<boolean>(true);

  useEffect(() => {
    const isEmpty = minValue === '' || maxValue === '';
    const isIncorrect = Number(minValue) < 0 || Number(maxValue) < 0 || Number(minValue) >= Number(maxValue);

    setIsStorageEmpty(isEmpty);
    setIsIncorrectValue(isIncorrect);
  }, [minValue, maxValue]);

  const handleSetValues = (min: string, max: string) => {
    setMinValue(min);
    setMaxValue(max);

    localStorage.setItem('storedMinValue', min);
    localStorage.setItem('storedMaxValue', max);

    setValuesSet(true);
    setIsStorageEmpty(false);
  };

  return (
    <div className="App">
      <SettingWindow onSetValues={handleSetValues} setIsIncorrectValue={setIsIncorrectValue} />
      <Enumerator minValue={minValue} maxValue={maxValue} isIncorrectValue={isIncorrectValue} isStorageEmpty={isStorageEmpty} valuesSet={valuesSet} />
    </div>
  );
}

export default App;
