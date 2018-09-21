import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app/styles/responsive.css';
import './app/styles/icons.css';
import './app/styles/componentStyles.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
