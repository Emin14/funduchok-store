import './index.css';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './Redux/store';
import './firebase';



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


const persistor = persistStore(store);
console.log(persistor)
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
)
