import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainComponent/MainPage';
import BodyAuth from './components/AuthorizationComponent/BodyAuth';
import BodyRegist from './components/RegistrationComponent/BodyRegist';
import PersonalArea from './components/PersonalAreaComponent/PersonalArea';
import './App.scss';

const App = () => {
  return (
    <div className="app-blick">
      <Switch>
        <Route path='/Authorization' component={BodyAuth} />
        <Route path='/Registration' component={BodyRegist} />
        <Route path='/MainPage' component={MainPage} />
        <Route path='/PersonalArea' component={PersonalArea} />
        <Redirect from='/' to='/Registration' />
      </Switch>
    </div>
  );
}

export default App;