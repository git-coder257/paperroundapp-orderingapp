import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/home';
import Login from './components/login';
import Createaccount from './components/createaccount';
import Loginoptions from './components/loginoptions';

function App() {
  return (<BrowserRouter>
    <Route exact path="/" component={Loginoptions}/>
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/createaccount" component={Createaccount}/>
  </BrowserRouter>);
}

export default App;