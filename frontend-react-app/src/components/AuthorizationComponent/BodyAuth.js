import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import Svg from '../Elements/SvgMain/SvgMain';
import './BodyAuth.scss';

const BodyAuth = ({ Error, setError }) => {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const history = useHistory();

  const authorization = () => {
    if (loginInput.length < 6) return setError('Введите более 6 символов в поле логина!');
    if (passwordInput.length < 6) return setError('Введите более 6 символов в поле пароля!');

    if (/((?=.*[0-9])(?=.*[a-zA-Z]))/.test(passwordInput)) {
      axios.post('http://localhost:8000/authorizationUser', {
        login: loginInput,
        password: passwordInput
      }).then(res => {
        setError('');
        localStorage.setItem('user', JSON.stringify(res.data));
        history.push('/MainPage');
      }).catch((err) => {
        switch (err.response.status) {
          case 420:
            return setError('Пользователь не найден!');
          case 421:
            return setError('Не верный пароль!');
          default:
            break;
        }
      });
    } else {
      return setError('Используйте латинские буквы и хотя бы одно число в пароле!');
    }
  }

  const onClickSwitch = () => {
    setError('');
    setLoginInput('');
    setPasswordInput('');
  }


  return (
    <>
      <Header name='Войти в систему' flag={false} />
      <div className="main-block-auth w-100">

        <Svg />

        <div className="auth-block">
          <h1 className="h1-auth m-4 text-center">
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

            <button
              onClick={() => authorization()}
              className="button-auth btn btn-outline-success"
            >
              Войти
            </button>

            {
              Error && <span>{Error}</span>
            }
          </div>

          <Link onClick={() => onClickSwitch()} className="trans-auth" to='/Registration'>
            <p className="p-auth">Зарегистрироваться</p>
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
)(BodyAuth);