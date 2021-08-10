import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import Svg from '../Elements/SvgMain/SvgMain';
import './BodyRegist.scss';

const BodyRegist = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');
  const [errorInput, setErrorInput] = useState('');

  const history = useHistory();

  const registration = () => {
    if (loginInput.length < 6) return setErrorInput('Введите более 6 символов в поле логина!');
    if (passwordInput.length < 6) return setErrorInput('Введите более 6 символов в поле пароля!');

    for (let i = 0; i < passwordInput.length; i++) {
      if (/[а-яА-Я]/.test(passwordInput[i])) return setErrorInput('Используйте латинские буквы в пароле!');
    }

    let flagNum = false;
    for (let i = 0; i < passwordInput.length; i++) {
      if (/[0-9]/.test(passwordInput[i])) flagNum = true;
    }
    if (flagNum === false) return setErrorInput('Добавьте хотя бы одно число в пароль!');

    if (passwordInput !== passwordRepeatInput) return setErrorInput('Пароли не совпадают!');

    axios.post('http://localhost:8000/registrationUser', {
      login: loginInput,
      password: passwordRepeatInput
    }).then(res => {
      setErrorInput('');
      localStorage.setItem('user', JSON.stringify(res.data));
      history.push('/MainPage');
    }).catch ((err) => {
      if (err.response.status === 421) return setErrorInput('Пользователь уже существует в системе!');
    });
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
              name="login"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="text"
              placeholder="Password"
              name="password"
              className="form-control mb-3"
            />

            <label className="mb-1">Repeat password:</label>
            <input
              onChange={(e) => setPasswordRepeatInput(e.target.value)}
              type="text"
              placeholder="Password"
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
    </>
  );
}

export default BodyRegist;