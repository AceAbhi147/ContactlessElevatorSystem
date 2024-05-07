import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage';
import HealthPage from './pages/HealthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route excat path="/" element={<ExamplePage/>}></Route>
        <Route excat path="/health" element={<HealthPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
