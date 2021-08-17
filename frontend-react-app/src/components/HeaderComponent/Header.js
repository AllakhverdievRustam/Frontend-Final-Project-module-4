import React from 'react';
import { useHistory } from 'react-router-dom';
import Svg from '../Elements/SvgHeader/SvgHeader';
import './Header.scss';

const Header = ({ name, flag }) => {
  const history = useHistory();

  return (
    <div className="header w-100">
      <Svg />

      <p className="header-lable text-center m-4">{name}</p>

      {
        flag &&
        <button onClick={() => history.push('/Authorization')} type="button" className="button-header btn btn-outline-dark">
          Выход
        </button>
      }
    </div>
  );
}

export default Header;