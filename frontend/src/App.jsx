import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import PredictPage from './pages/PredictPage';
import EmployeeLookUp from './pages/EmployeeLookUp';
import { AnimatePresence, motion } from "framer-motion";
import {
  SiFramer,
  SiTailwindcss,
  SiReact,
  SiJavascript,
} from "react-icons/si";

import './App.css';
import Managment from './pages/Managment';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SideNav />
        <div className="content">
          <Routes>
            <Route path="/" element={<EmployeeLookUp />} />
            <Route path="/employees/:id" element={<EmployeePage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/managment" element={<Managment />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="sidebar">
      {/* Logo */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Nav Items */}
      <NavItem selected={selected === 0} id={0} setSelected={setSelected} to="/">
        <SiTailwindcss />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected} to="/predict">
        <SiReact />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected} to="/managment">
        <SiJavascript />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected} to="/login">
        <SiFramer />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
    onClick={() => setSelected(id)}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="nav-icon-wrapper"
    >
      <span className="nav-icon">{children}</span>
      <AnimatePresence>
        {selected === id && (
          <motion.span
            className="nav-highlight"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  </NavLink>
);


