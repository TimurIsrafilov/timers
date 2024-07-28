import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./run.module.css";

function Run(props) {
  const newTimer = props.timers.filter((t) => t.id === props.timerId);

  const navigate = useNavigate();

  if (newTimer.length < 1) {
    navigate("/", { replace: true });
  }

  const [timerTime, setTimerTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const [percent, setPercent] = useState(100);

  const min = String(Math.floor(timerTime / 60)).padStart(2, "0");
  const sec = String(timerTime % 60).padStart(2, "0");

  useEffect(() => {
    handleTimerStart();
  }, []);

  function handleTimerStart() {
    setTimerStatus(true);
    setTimerTime(newTimer[0].time);
  }

  function handleTimerStop() {
    setTimerStatus(false);
    props.handleTimerTimeChange(newTimer[0].id, timerTime);
  }

  function handleTimerReject() {
    props.handleTimerDelete(newTimer[0].id);
    navigate("/", { replace: true });
  }

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (timerStatus === true) {
        setTimerTime((timerTime) => timerTime - 1);
      }
      if (timerTime === 0) {
        setTimerStatus(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStatus]);

  useEffect(() => {
    setPercent(
      100 - 100 * ((newTimer[0].initial - timerTime) / newTimer[0].initial)
    );
  }, [timerTime]);

  return (
    <div className={styles.run}>
      <div className={styles.run__progress_timer_container}>
        <svg className={styles.run__progress}>
          <circle
            className={styles.run__progress_round}
            strokeDasharray={`785 785`}
            strokeDashoffset={785 - (percent / 100) * 785}
          />
        </svg>
        <div className={styles.run__timer}>{`${min} : ${sec}`}</div>
      </div>

      <div className={styles.run__buttons_container}>
        <button
          className={styles.run__button_start_stop}
          onClick={
            timerStatus ? () => handleTimerStop() : () => handleTimerStart()
          }
        >
          {timerStatus ? "Пауза" : "Возобновить"}
        </button>
        <button
          className={styles.run__button_reject}
          onClick={() => handleTimerReject()}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

export default Run;
