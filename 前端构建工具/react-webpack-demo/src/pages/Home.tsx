import React from 'react';
import logo from '../logo.svg';

const Home: React.FC = () => {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
    </div>
  );
};

export default Home;
