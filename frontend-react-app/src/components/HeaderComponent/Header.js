import React from 'react';
import { Link } from 'react-router-dom';
import Svg from '../Elements/SvgHeader/SvgHeader';
import './Header.scss';

const Header = ({ name, flag }) => {
  return (
    <div className="header w-100">
      <Svg />

      <p className="header-lable text-center m-4">{name}</p>

      {
        flag &&
        <Link className="button-header" to='/Authorization'>
          <button
            type="button"
            className="btn btn-outline-dark"
          >
            Выход
          </button>
        </Link>
      }
    </div>
  );
}

export default Header;