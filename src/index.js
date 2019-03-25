import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './app/styles/bootstrap.css';
import './app/styles/responsive.css';
import './app/styles/icons.css';
import './app/styles/componentStyles.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
