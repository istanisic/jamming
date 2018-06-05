import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import './components/app/app.css';
import App from './components/app/app.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
