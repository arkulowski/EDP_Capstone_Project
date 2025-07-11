import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage         from './pages/HomePage';
import EmployeeLookup   from './pages/EmployeeLookup';
import PredictPage      from './pages/PredictPage';
import './index.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <header>
        <nav className="container">
          <NavLink to="/"        end className={({isActive})=> isActive?'active':''}>Home</NavLink>
          <NavLink to="/employees" className={({isActive})=> isActive?'active':''}>Directory</NavLink>
          <NavLink to="/predict"   className={({isActive})=> isActive?'active':''}>Predict Salary</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeeLookup />} />
          <Route path="/predict" element={<PredictPage />} />
        </Routes>
      </main>
    </Router>
  );
}
