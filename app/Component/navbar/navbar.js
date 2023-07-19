"use client"

import React, { useState } from 'react';
import './navbar.scss';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  const handleOpenNav = () => {
    setSideNavOpen(true);
  };

  const handleCloseNav = () => {
    setSideNavOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="logo"><img src="./Pomodoro.png" alt=""/></div>
          <div className={`sidenav ${isSideNavOpen ? 'active' : ''}`}>
            <a className="close" onClick={handleCloseNav}>
              &times;
            </a>
            <ul>
              <li>
              <Link href="/">Pomodoro</Link>
              </li>

              <li>
              <a href="https://lysianedon.github.io/Morpion-React/" target='_blank' rel='noopener noreferrer'>Game</a>
              </li>
              <li>
              <a href="https://www.youtube.com/@ParfaitementWeb" target='_blank' rel='noopener noreferrer'>Tutoriel</a>
              </li>
              
            </ul>
          </div>
          <a className="openBtn" onClick={handleOpenNav}>
            <span className={`burger-icon ${isSideNavOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;