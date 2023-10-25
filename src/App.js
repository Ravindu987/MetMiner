import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/home/index';
import { MetaphorPage } from './pages/metaphors/index';
import { AllPage } from './pages/all/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/metaphors" element={<MetaphorPage />} />
        <Route path="/all" element={<AllPage />} />
      </Routes>
  </Router>
  );
}

export default App;
