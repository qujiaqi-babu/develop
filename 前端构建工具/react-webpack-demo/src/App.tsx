import React from 'react';
import './App.less';
import MyRoutes from './myRoutes';
import { HashRouter as Router, NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <MyRoutes />
          <div>
            <NavLink className="App-link" to="/">Home Page</NavLink>
            <span> | </span>
            <NavLink className="App-link" to="/babu">Babu Page</NavLink>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
