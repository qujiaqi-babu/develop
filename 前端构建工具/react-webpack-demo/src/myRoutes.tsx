import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Babu from './pages/Babu';

const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/babu" element={<Babu />} />
    </Routes>
  );
};

export default MyRoutes;
