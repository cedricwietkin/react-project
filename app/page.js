"use client"
import React, { useState } from 'react';
import Pomodoro from './podomoro/page';
import './podomoro/podomoro.scss'
import './style.css';
import Link from 'next/link';

export default function Home() {
  const [timerBackground, setTimerBackground] = useState('pomodoro-background');

  const handleBackgroundChange = (backgroundClass) => {
    setTimerBackground(backgroundClass);
  };

  return (
    <>
      <main>
        <Pomodoro/>
      </main>
    </>
  );
}
