import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import Svg from '../Elements/SvgMain/SvgMain';
import './BodyAuth.scss';

const BodyAuth = () => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorInput, setErrorInput] = useState('');

  const history = useHistory();

  const authorization = () => {
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

    axios.post('http://localhost:8000/authorizationUser', {
      login: loginInput,
      password: passwordInput
    }).then(res => {
      setErrorInput('');
      localStorage.setItem('user', JSON.stringify(res.data));
      history.push('/MainPage');
    }).catch ((err) => {
      switch(err.response.status) {
        case 420:
          return setErrorInput('Пользователь не найден!');
        case 421:
          return setErrorInput('Не верный пароль!');
        default:
          break;
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
              name="login-name"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="text"
              placeholder="Password"
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
    </>
  );
}

export default BodyAuth;