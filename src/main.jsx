import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/index.scss';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_APP_USERPOOL_ID,
  ClientId: import.meta.env.VITE_APP_APPCLIENT_ID,
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App aws={userPool} />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
)
