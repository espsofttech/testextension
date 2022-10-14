import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup  from './Components/Make_wallet/signup';
import {MemoryRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

import reportWebVitals from './reportWebVitals';
import SignUp from './Components/Make_wallet/signup';
const history = createBrowserHistory()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router history={history}> 
    <SignUp/>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
