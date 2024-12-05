import { useEffect, useState } from 'react';
import './App.css';
import { Enumerator } from './components/Enumerator';
import { SettingWindow } from './components/SettingWindow';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <SettingWindow  />
      <Enumerator />
    </div>
    </Provider>

  );
}

export default App;
