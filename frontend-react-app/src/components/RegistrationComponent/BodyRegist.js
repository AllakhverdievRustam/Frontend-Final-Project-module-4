import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../HeaderComponent/Header';
import Svg from '../Elements/SvgMain/SvgMain';
import './BodyRegist.scss';

const BodyRegist = ({ Error, Registration, setError, setRegPassInput, setRegPassRepeatInput, setRegLoginInput }) => {
  const history = useHistory();

  const registration = () => {
    if (Registration.login.length < 6) return setError('Введите более 6 символов в поле логина!');
    if (Registration.password.length < 6) return setError('Введите более 6 символов в поле пароля!');

    if (/((?=.*[0-9])(?=.*[a-zA-Z]))/.test(Registration.password)) {
      if (Registration.password !== Registration.passwordRepeat) return setError('Пароли не совпадают!');

      axios.post('http://localhost:8000/registrationUser', {
        login: Registration.login,
        password: Registration.passwordRepeat
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
    setRegPassInput('');
    setRegPassRepeatInput('');
    setRegLoginInput('');
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
              onChange={(e) => setRegLoginInput(e.target.value)}
              type="text"
              placeholder="login"
              name="login"
              className="form-control mb-3"
            />

            <label className="mb-1">Password:</label>
            <input
              onChange={(e) => setRegPassInput(e.target.value)}
              type="text"
              placeholder="Password"
              name="password"
              className="form-control mb-3"
            />

            <label className="mb-1">Repeat password:</label>
            <input
              onChange={(e) => setRegPassRepeatInput(e.target.value)}
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
    Error: state.Error,
    Registration: state.Registration
  }),
  dispatch => ({
    setError: (value) => {
      dispatch({ type: 'ERROR', payload: value });
    },
    setRegPassInput: (value) => {
      dispatch({ type: 'REG-PASS', payload: value });
    },
    setRegPassRepeatInput: (value) => {
      dispatch({ type: 'REG-PASS-REPEAT', payload: value });
    },
    setRegLoginInput: (value) => {
      dispatch({ type: 'REG-LOGIN', payload: value });
    }
  })
)(BodyRegist);