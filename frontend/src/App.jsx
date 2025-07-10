import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage     from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import PredictPage  from './pages/PredictPage';

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> | <Link to="/predict">Predict Salary</Link>
      </header>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/employees/:id"  element={<EmployeePage />} />
          <Route path="/predict"        element={<PredictPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
