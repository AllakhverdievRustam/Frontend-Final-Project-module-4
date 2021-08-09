import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './BodyRegist.scss';
import Svg from '../MainSvg';
import BodyAuth from './BodyAuth';

const BodyRegist = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [user, setUser] = useState({});

  const history = useHistory();

  const registration = () => {
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

    if (passwordInput !== passwordRepeatInput) return setErrorInput('Пароли не совпадают!');

    axios.post('http://localhost:8000/registrationUser', {
      login: loginInput,
      password: passwordRepeatInput
    }).then(res => {
      setErrorInput('');
      setUser(res.data);

      // Переход на главную страницу
    }).catch ((err) => {
      if (err.response.status === 421) return setErrorInput('Логин занят!');
    });
  }

  const goToMainPage = (user) => {
    history.push('/MainPage');
  }

  return (
    <>
      <Header name='Зарегистрироваться в системе' />
      <div className="main-block-login w-100">

        <Svg />

        <div className="log-block">
          <h1 className="m-4">
            Регистрация
          </h1>

          <div className="login-form mb-3">
            <label className="mb-1">login:</label>
            <input
              onChange={(e) => setLoginInput(e.target.value)}
              type="text"
              placeholder="login"
              id="login-id"
              name="login"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="text"
              placeholder="Password"
              id="password-id"
              name="password"
              className="form-control mb-3"
            />

            <label className="mb-1">Repeat password:</label>
            <input
              onChange={(e) => setPasswordRepeatInput(e.target.value)}
              type="text"
              placeholder="Password"
              id="password-repeat-id"
              name="password-repeat"
              className="form-control mb-4"
            />

            <button onClick={() => registration()} className="button-login btn btn-outline-success">
              Зарегистрироваться
            </button>

            {
              errorInput && <span>{errorInput}</span>
            }
          </div>

          <Link className="trans-auth" to='/Authorization'>
            <p>Авторизоваться</p>
          </Link>
        </div>
      </div>

      <Switch>
        <Route path='/Authorization' component={BodyAuth} />
      </Switch>
    </>
  );
}

export default BodyRegist;