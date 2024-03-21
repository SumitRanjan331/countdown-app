import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      intervalId = setInterval(() => {
        const now = new Date();
        const then = new Date(targetDate);
        const difference = then - now;

        if (difference <= 0) {
          clearInterval(intervalId);
          setTimerActive(false);
          alert('Please select future time');
          return;
        }

        setTimeLeft(calculateTimeLeft(difference));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerActive, targetDate]);

  const calculateTimeLeft = (difference) => {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const startTimer = () => {
    if (targetDate === '') {
      alert('Please select a target date and time.');
      return;
    }
    setTimerActive(true);
  };

  const pauseTimer = () => setTimerActive(false);

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div className="countdown-timer">
        <div id='heading'>
            <h1>Countdown</h1>
            <h1 id='heading2'>Timer</h1> 
        </div>
      <div className="input-fields">
        <input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
      </div>
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="timer-display">
        <div className="timer-item">
          <div>{timeLeft.days}</div>
          <span>Days</span>
        </div>
        <div className="timer-item">
          <div>{timeLeft.hours}</div>
          <span>Hours</span>
        </div>
        <div className="timer-item">
         <div>{timeLeft.minutes}</div>
         <span>Minutes</span>
        </div>
        <div className="timer-item">
         <div>{timeLeft.seconds}</div>
         <span>Seconds</span>
        </div>
      </div>
      <div id='creator'>Created by SUMIT RANJAN...</div>
    </div>
  );
};

export default CountdownTimer;
