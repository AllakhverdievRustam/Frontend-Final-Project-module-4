import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import BodyRegist from './pages/BodyRegist';
import BodyAuth from './pages/BodyAuth';
import MainPage from './pages/MainPage';

import './App.scss';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/Authorization' component={BodyAuth} />
        <Route path='/Registration' component={BodyRegist} />
        <Route path='/MainPage' component={MainPage} />
        <Redirect from='/' to='/Registration' />
      </Switch>
    </div>
  );
}

export default App;