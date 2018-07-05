import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store';
import { startListener } from './app/redux/store/listener'
import createHistory from "history/createHashHistory";

import AppRoute from './app/app';

const history = createHistory();

const store = configureStore(history); 
startListener(history, store)

const App = () => (
  <Provider store={store}>
    <AppRoute history={history} />
  </Provider>
) 

export default App;
