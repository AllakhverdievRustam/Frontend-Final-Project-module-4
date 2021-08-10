import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import BodyRegist from './components/RegistrationComponent/BodyRegist';
import BodyAuth from './components/AuthorizationComponent/BodyAuth';
import MainPage from './components/MainComponent/MainPage';
import './App.scss';

const App = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div>
      <Switch>
        <Route path='/Authorization' component={BodyAuth} />
        <Route path='/Registration' component={BodyRegist} />
        <Route path='/MainPage'>
          <MainPage user={userData} />
        </Route>
        <Redirect from='/' to='/Registration' />
      </Switch>
    </div>
  );
}

export default App;