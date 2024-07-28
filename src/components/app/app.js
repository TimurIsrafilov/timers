import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "../header/header";

import Add from "../../pages/add/add";
import Edit from "../../pages/edit/edit";
import Home from "../../pages/home/home";
import Run from "../../pages/run/run";

import styles from "./app.module.css";

function App() {
  const [timers, setTimers] = useState([]);
  const [timerId, setTimerId] = useState(null);

  function onAddTimer(data) {
    timers.push(data);
    setTimerId(data.id);
  }

  function handleTimerTimeChange(id, timerTime) {
    const timersCopy = [...timers];
    const timersCurrent = timersCopy.find((t) => t.id === id);
    timersCurrent.time = timerTime;
  }

  function handleTimerDelete(id) {
    setTimers(timers.filter((t) => t.id !== id));
  }

  return (
    <div className={styles.page}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              timers={timers}
              handleTimerTimeChange={handleTimerTimeChange}
              handleTimerDelete={handleTimerDelete}
            />
          }
        />
        <Route path="/add" element={<Add onAddTimer={onAddTimer} />} />
        <Route
          path="/edit"
          element={
            <Edit
              timers={timers}
              handleTimerTimeChange={handleTimerTimeChange}
              handleTimerDelete={handleTimerDelete}
            />
          }
        />
        <Route
          path="/run"
          element={
            <Run
              timers={timers}
              timerId={timerId}
              handleTimerTimeChange={handleTimerTimeChange}
              handleTimerDelete={handleTimerDelete}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
