import React from 'react';
import Header from '../HeaderComponent/Header';
import './MainPage.scss';

const MainPage = ({user}) => {
  return(
    <div>
      <Header name='Войти в систему' />
    </div>
  );
}

export default MainPage;