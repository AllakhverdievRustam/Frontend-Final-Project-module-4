import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './BodyAuth.scss';
import Svg from '../MainSvg';
import BodyRegist from './BodyRegist';

const BodyAuth = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [user, setUser] = useState({});

  const history = useHistory();

  const authorization = () => {
    if (loginInput.length < 6) return setErrorInput('Введите более 6 символов в поле логина!');
    if (passwordInput.length < 6) return setErrorInput('Введите более 6 символов в поле пароля!');

    for (let i = 0; i < passwordInput.length; i++) {
      if (/[а-яА-Я]/.test(passwordInput[i])) return setErrorInput('Используйте латинские буквы в пароле!');
    }

    let flagNum = false;
    for (let i = 0; i < passwordInput.length; i++) {
      if (Number.isInteger(Number(passwordInput[i]))) flagNum = true;
    }
    if (flagNum === false) return setErrorInput('Добавьте хотя бы одно число в пароль!');

    axios.post('http://localhost:8000/authorizationUser', {
      login: loginInput,
      password: passwordInput
    }).then(res => {
      setErrorInput('');
      setUser(res.data);

      // Переход на главную страницу
    }).catch ((err) => {
      if (err.response.status === 420) {
        setErrorInput('Пользователь не найден!');
      } else if (err.response.status === 421) {
        setErrorInput('Не верный пароль!');
      }
    });
  }

  return (
    <>
      <Header name='Войти в систему' />
      <div className="main-block-auth w-100">

        <Svg />

        <div className="auth-block">
          <h1 className="m-5">
            Войти в систему
          </h1>

          <div className="auth-form mb-3">
            <label className="mb-1">login:</label>
            <input
              onChange={(e) => setLoginInput(e.target.value)}
              type="text"
              placeholder="login"
              id="login-id"
              name="login-name"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="text"
              placeholder="Password"
              id="password-id"
              name="password-name"
              className="form-control mb-5"
            />

            <button onClick={() => authorization()} className="button-auth btn btn-outline-success">
              Войти
            </button>

            {
              errorInput && <span>{errorInput}</span>
            }
          </div>

          <Link className="trans-regist" to='/Registration'>
            <p>Зарегистрироваться</p>
          </Link>
        </div>
      </div>

      <Switch>
        <Route path='/Registration' component={BodyRegist} />
      </Switch>
    </>
  );
}

export default BodyAuth;