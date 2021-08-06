import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
  Link,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import BodyAuth from './BodyAuth';

import './App.scss';

function App() {
  return (
    <div>
      <Header />
      <BodyAuth />
    </div>
  );
}

export default App;