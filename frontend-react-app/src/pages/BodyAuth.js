import React from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';

import Header from '../components/Header';
import './BodyAuth.scss';

const BodyAuth = () => {
  const authorization = () => {

  }

  let history = useHistory();

  return (
    <>
      <Header name='Войти в систему' />
      <div className="main-block-auth w-100">
        <svg width="376" height="376" viewBox="0 0 376 376" xmlns="http://www.w3.org/2000/svg">
          <path d="M188 83.8333V0.5H0.500031V375.5H375.5V83.8333H188ZM75.5 333.833H38V292.167H75.5V333.833ZM75.5 250.5H38V208.833H75.5V250.5ZM75.5 167.167H38V125.5H75.5V167.167ZM75.5 83.8333H38V42.1667H75.5V83.8333ZM150.5 333.833H113V292.167H150.5V333.833ZM150.5 250.5H113V208.833H150.5V250.5ZM150.5 167.167H113V125.5H150.5V167.167ZM150.5 83.8333H113V42.1667H150.5V83.8333ZM338 333.833H188V292.167H225.5V250.5H188V208.833H225.5V167.167H188V125.5H338V333.833ZM300.5 167.167H263V208.833H300.5V167.167ZM300.5 250.5H263V292.167H300.5V250.5Z" fill="black" fillOpacity="0.8" />
        </svg>

        <div className="log-block">
          <h1 className="m-5">
            Войти в систему
          </h1>

          <form onSubmit={authorization} className="auth-form mb-3">
            <label className="mb-1">login:</label>
            <input 
              type="email"
              placeholder="login"
              id="email-id"
              name="email-name"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input 
              type="text"
              placeholder="Password"
              id="password-id"
              name="password-name"
              className="form-control mb-5"
            />

            <button className="button-login btn btn-outline-success">
              Войти
            </button>
          </form>

          <p onClick={() => history.push('/Registration')} className="">Зарегистрироваться</p>
        </div>
      </div>
    </>
  );
}

export default BodyAuth;