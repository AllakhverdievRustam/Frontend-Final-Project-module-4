import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import Svg from '../Elements/SvgMain/SvgMain';
import './BodyRegist.scss';

const BodyRegist = ({ Error, setError }) => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');

  const history = useHistory();

  const registration = () => {
    if (loginInput.length < 6) return setError('Введите более 6 символов в поле логина!');
    if (passwordInput.length < 6) return setError('Введите более 6 символов в поле пароля!');

    if (/((?=.*[0-9])(?=.*[a-zA-Z]))/.test(passwordInput)) {
      if (passwordInput !== passwordRepeatInput) return setError('Пароли не совпадают!');

      axios.post('http://localhost:8000/registrationUser', {
        login: loginInput,
        password: passwordRepeatInput
      }).then(res => {
        setError('');
        localStorage.setItem('user', JSON.stringify(res.data));
        history.push('/MainPage');
      }).catch((err) => {
        if (err.response.status === 421) return setError('Пользователь уже существует в системе!');
      });
    } else {
      return setError('Используйте латинские буквы и хотя бы одно число в пароле!');
    }
  }

  const onClickSwitch = () => {
    setError('');
    setLoginInput('');
    setPasswordInput('');
    setPasswordRepeatInput('');
  }

  return (
    <>
      <Header name='Зарегистрироваться в системе' flag={false} />
      <div className="main-block-regist w-100">

        <Svg />

        <div className="regist-block">
          <h1 className="h1-regist">
            Регистрация
          </h1>

          <div className="regist-form mb-3">
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

            <button
              onClick={() => registration()}
              className="button-regist btn btn-outline-success"
            >
              Зарегистрироваться
            </button>

            {
              Error && <span>{Error}</span>
            }
          </div>

          <Link onClick={() => onClickSwitch()} className="trans-regist" to='/Authorization'>
            <p className="p-regist"> Авторизоваться </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default connect(
  state => ({
    Error: state.Error
  }),
  dispatch => ({
    setError: (value) => {
      dispatch({ type: 'ERROR', payload: value });
    }
  })
)(BodyRegist);