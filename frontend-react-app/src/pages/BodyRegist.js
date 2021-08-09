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

const BodyRegist = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [user, setUser] = useState({});

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
      setLoginInput('');
      setPasswordInput('');
      setPasswordRepeatInput('');
      setErrorInput('');
      setUser(res.data);
    });

    goToMainPage(user);
  }

  let history = useHistory();
  const goToMainPage = (user) => {
    history.push('/MainPage');
  }

  return (
    <>
      <Header name='Зарегистрироваться в системе' />
      <div className="main-block-login w-100">
        <svg width="376" height="376" viewBox="0 0 376 376" xmlns="http://www.w3.org/2000/svg">
          <path d="M188 83.8333V0.5H0.500031V375.5H375.5V83.8333H188ZM75.5 333.833H38V292.167H75.5V333.833ZM75.5 250.5H38V208.833H75.5V250.5ZM75.5 167.167H38V125.5H75.5V167.167ZM75.5 83.8333H38V42.1667H75.5V83.8333ZM150.5 333.833H113V292.167H150.5V333.833ZM150.5 250.5H113V208.833H150.5V250.5ZM150.5 167.167H113V125.5H150.5V167.167ZM150.5 83.8333H113V42.1667H150.5V83.8333ZM338 333.833H188V292.167H225.5V250.5H188V208.833H225.5V167.167H188V125.5H338V333.833ZM300.5 167.167H263V208.833H300.5V167.167ZM300.5 250.5H263V292.167H300.5V250.5Z" fill="black" fillOpacity="0.8" />
        </svg>

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

          <p onClick={() => history.push('/Authorization')} className="">Авторизоваться</p>
        </div>
      </div>
    </>
  );
}

export default BodyRegist;