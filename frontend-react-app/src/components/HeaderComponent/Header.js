import React from 'react';
import Svg from '../Elements/SvgHeader/SvgHeader';
import './Header.scss';

const Header = (props) => {
  return(
    <div className="header w-100">
      <Svg />

      <p className="header-lable m-4">{props.name}</p>
    </div>
  );
}

export default Header;