import React from 'react';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import configureStore from './app/redux/store';
import { startListener } from './app/redux/store/listener'
import createHistory from 'history/createHashHistory';
import AppRoute from './app/app';
import userManager from '../src/app/utils/userManager';
import { loadUser } from 'redux-oidc';
import './App.css';

const history = createHistory();
const store = configureStore(history);
startListener(history, store);
loadUser(store, userManager);

const App = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <AppRoute history={history} />
    </OidcProvider>
  </Provider>
) 

export default App;
