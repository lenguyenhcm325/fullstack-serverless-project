
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Amplify } from 'aws-amplify';
import { Provider } from 'react-redux';
import awsExports from "./aws-exports";
import './index.css'
import { store } from './store/store.js';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
