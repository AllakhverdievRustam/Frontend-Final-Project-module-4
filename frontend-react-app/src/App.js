import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BodyRegist from './components/RegistrationComponent/BodyRegist';
import BodyAuth from './components/AuthorizationComponent/BodyAuth';
import MainPage from './components/MainComponent/MainPage';
import './App.scss';

const App = () => {
  return (
    <div className="app-blick">
      <Switch>
        <Route path='/Authorization' component={BodyAuth} />
        <Route path='/Registration' component={BodyRegist} />
        <Route path='/MainPage'>
          <MainPage />
        </Route>
        <Redirect from='/' to='/Registration' />
      </Switch>
    </div>
  );
}

export default App;