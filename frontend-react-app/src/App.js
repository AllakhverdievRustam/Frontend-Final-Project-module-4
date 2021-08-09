import React from 'react';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import BodyRegist from './pages/BodyRegist';
import BodyAuth from './pages/BodyAuth';
import MainPage from './pages/MainPage';

import './App.scss';

function App() {
  let history = useHistory();
  history.push('/Registration');

  return (
    <div>

      <Switch>
        <Route path={'/Authorization'} component={BodyAuth} />
        <Route path={'/Registration'} component={BodyRegist} />
        <Route path={'/MainPage'} component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;