import React from 'react';
import { Link } from 'react-router-dom';
import Svg from '../Elements/SvgHeader/SvgHeader';
import './Header.scss';

const Header = ({ name, flagExit, flagArea }) => {
  const deleteToken = () => {
    localStorage.clear();
  }

  return (
    <div className="header w-100">
      <Svg />

      <p className="header-lable text-center">{name}</p>

      {
        flagExit &&
        <div className="header-btn-block">
          <Link onClick={() => deleteToken()} to='/Authorization'>
            <button
              type="button"
              className="btn btn-outline-dark"
            >
              Выход
            </button>
          </Link>
          {
            flagArea ?
              <Link className='btn-area' to='/PersonalArea'>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                >
                  Кабинет
                </button>
              </Link>
              :
              <Link className='btn-area' to='/MainPage'>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                >
                  Назад
                </button>
              </Link>
          }
        </div>
      }
    </div>
  );
}

export default Header;