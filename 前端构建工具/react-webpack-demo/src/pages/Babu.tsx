import React from 'react';
import logo from '../babu.svg';

const Babu: React.FC = () => {
  return (
    <div>
      <img src={logo} className="Babu-logo" alt="logo" />
      <h1>Babu Page</h1>
      <p>Welcome to the Babu Page!</p>
    </div>
  );
};

export default Babu;
