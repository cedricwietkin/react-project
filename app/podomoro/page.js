import React, { useState, useEffect } from 'react';
import './podomoro.scss';

function Pomodoro () {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

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
  };

  const handlePause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setShowAlert(false);
  };

  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setShowAlert(false);
  };

  const handleNextTask = () => {
    setTaskCompleted(true);
    setShowAlert(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleSwitchToGamePage = () => {
    // Code pour basculer vers la page "_game"
    console.log("Switching to the '_game' page...");
  };

  return (
    <>
      <div className="pomodoro">
        <div className="timer">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
        </div>

        <div className="button">
          <button className='addition' onClick={handleIncrease}>+1</button>
          <button className='soustraction' onClick={handleDecrease}>-1</button>
          <button className='stop' onClick={handlePause}>Pause</button>
          <button className='reset' onClick={handleReset}>Reset</button>
          <button className='play' onClick={handlePlay}>Play</button>
      </div>

      {showAlert && (
        <div className="alert">
          <p>Le minuteur est terminé !</p>
          <p>Voulez-vous passer à la tâche suivante ?</p>
          <button className='yes' onClick={handleNextTask}>Oui</button>
          <button className='no' onClick={handleSwitchToGamePage}>Non</button>
        </div>
      )}
      </div>
      
    </>
  );
}

export default Pomodoro;