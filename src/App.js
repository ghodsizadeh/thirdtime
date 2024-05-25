// src/App.js
import React, { useState, useEffect } from "react";
import Ripple from "./Ripple";
import "./App.css";

function App() {
  const [workTime, setWorkTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isWorking, setIsWorking] = useState(false); // true means work time, false means break time
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        if (isWorking) {
          setWorkTime((prev) => prev + 1);
        } else {
          setBreakTime((prev) => prev - 1);
          if (breakTime <= 0) {
            notifyEndOfBreak();

            reset();
          }
        }
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, [timer, isWorking, breakTime]);

  const startWork = () => {
    setIsWorking(true);
    setTimer(true);
  };

  const notifyEndOfBreak = () => {
    const audio = document.getElementById("audio");
    audio.play();
  };

  const takeBreak = () => {
    setIsWorking(false);
    setBreakTime(Math.floor(workTime / 3));
    setTimer(true);
  };

  const reset = () => {
    setWorkTime(0);
    setBreakTime(0);
    setIsWorking(false);
    setTimer(null);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      <audio
        hidden
        id="audio"
        src="https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/bell_ring.mp3"
      ></audio>

      <Ripple
        size={300} //color="bg-blue-500"
        color={isWorking ? "bg-green-500" : "bg-blue-500"}
        opacity={0.2}
        numCircles={6}
        delay={0.1}
      />
      <div className="relative z-10 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Third Time Management</h1>
        <div className="mb-4">
          <p>
            {isWorking || breakTime === 0 ? "Work Time" : "Break Time"}:{" "}
            {formatTime(isWorking ? workTime : breakTime)}
          </p>
        </div>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 ${
              isWorking
                ? "bg-green-500 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
            } rounded`}
            onClick={isWorking ? takeBreak : startWork}
          >
            {isWorking ? "Take Break" : "Start Work"}
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
