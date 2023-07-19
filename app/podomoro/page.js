import React, { useState, useEffect } from 'react';
import './podomoro.scss';
import '/app/Component/todo/todo.scss';

import Navbar from '../Component/navbar/navbar';
import ToDoList from '../Component/todo/page';

function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro');
  const [timerBackground, setTimerBackground] = useState('pomodoro-background');

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setSeconds(59);
          setMinutes((prevMinutes) => prevMinutes - 1);
        }
      }, 1000);
    }

    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      setIsRunning(false);
      setShowAlert(true);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  useEffect(() => {
    const storedMinutes = localStorage.getItem('pomodoroMinutes');
    const storedSeconds = localStorage.getItem('pomodoroSeconds');

    if (storedMinutes && storedSeconds && !isRunning) {
      setMinutes(parseInt(storedMinutes, 10));
      setSeconds(parseInt(storedSeconds, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomodoroMinutes', minutes.toString());
    localStorage.setItem('pomodoroSeconds', seconds.toString());
  }, [minutes, seconds]);

  const handleIncrease = () => {
    setMinutes((prevMinutes) => prevMinutes + 1);
  };

  const handleDecrease = () => {
    if (minutes > 1) {
      setMinutes((prevMinutes) => prevMinutes - 1);
    }
  };

  
const handlePlay = () => {
  setIsRunning(true);
  setShowAlert(false);
  if (!showAlert) {
    document.querySelector('.timer').classList.add('play-animation');
  }
};

const handlePause = () => {
  setIsRunning((prevIsRunning) => !prevIsRunning);
  setShowAlert(false);
  document.querySelector('.timer').classList.remove('play-animation');
};
  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setShowAlert(false);
  };

  const handleNextTask = () => {
    setTaskCompleted(true);
  };

  const handleResumeTask = () => {
    setShowAlert(false);
  };

  const handlePostponeTask = () => {
    setShowAlert(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleSwitchToGamePage = () => {
    console.log("Switching to the '_game' page...");
  };

  const handlePomodoro = () => {
    setMinutes(25);
    setSeconds(0);
    setTimerType('pomodoro');
    setTimerBackground('pomodoro-background');
  };

  const handleShortPause = () => {
    setMinutes(5);
    setSeconds(0);
    setTimerType('short-pause');
    setTimerBackground('short-pause-background');
  };

  const handleLongPause = () => {
    setMinutes(15);
    setSeconds(0);
    setTimerType('long-pause');
    setTimerBackground('long-pause-background');
  };

  return (
    <>
      <Navbar />

      <div className={`pomodoro ${timerBackground}`}>
        <div className='update'>
          <button
            className={`Timer ${timerType === 'pomodoro' ? 'selected' : ''}`}
            onClick={handlePomodoro}
          >
            Pomodoro
          </button>
          <button
            className={`short_pause ${
              timerType === 'short-pause' ? 'selected' : ''
            }`}
            onClick={handleShortPause}
          >
            Short Pause
          </button>
          <button
            className={`long_pause ${
              timerType === 'long-pause' ? 'selected' : ''
            }`}
            onClick={handleLongPause}
          >
            Long Pause
          </button>
        </div>

        <div className="timer">
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>

        <div className="button">
          <button className="addition" onClick={handleIncrease}>
            +1
          </button>
          <button className="soustraction" onClick={handleDecrease}>
            -1
          </button>
          <button className="stop" onClick={handlePause}>
            Pause
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
          <button className="play" onClick={handlePlay}>
            Play
          </button>
        </div>

        {showAlert && (
          <div className="alert">
            <p>Le minuteur est terminé !</p>
            {taskCompleted ? (
              <>
                <p>Avez-vous fini votre tâche?</p>
                <button className="yes" onClick={handleSwitchToGamePage}>
                  Oui
                </button>
                <button className="no" onClick={handlePostponeTask}>
                  Non
                </button>
              </>
            ) : (
              <>
                <p>Voulez-vous passer à la tâche suivante?</p>
                <button className="yes" onClick={handleNextTask}>
                  Oui
                </button>
                <button className="no" onClick={handleResumeTask}>
                  Non
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <ToDoList/>
    </>
  );
}

export default Pomodoro;