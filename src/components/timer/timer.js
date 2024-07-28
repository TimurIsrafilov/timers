import { useState, useEffect } from "react";

import styles from "./timer.module.css";

import play from "../../images/play.svg";
import del from "../../images/del.svg";
import pause from "../../images/pause.svg";
import vector from "../../images/vector.svg";

function Timer(props) {
  const [timerTime, setTimerTime] = useState(props.time);
  const [timerStatus, setTimerStatus] = useState(false);

  const min = String(Math.floor(timerTime / 60)).padStart(2, "0");
  const sec = String(timerTime % 60).padStart(2, "0");

  const initialMin = String(Math.floor(props.initial / 60));

  function handleTimerStart() {
    setTimerStatus(true);
  }

  function handleTimerStop() {
    setTimerStatus(false);
    props.handleTimerTimeChange(props.id, timerTime);
  }

  function handleTimerDel() {
    props.handleTimerDelete(props.id);
  }

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (timerStatus === true) {
        setTimerTime((timerTime) => timerTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStatus]);

  const currentUrl = window.location.pathname.split("/").pop();

  let button;

  if (currentUrl === "") {
    button = true;
  } else if (currentUrl === "edit") {
    button = false;
  }

  return (
    <div>
      <div className={styles.timer__brake_line}></div>
      <div className={styles.timer}>
        <div className={styles.timer__button_timer_container}>
          {!button ? (
            <button
              className={styles.timer__button_delete}
              onClick={() => handleTimerDel()}
            >
              <img src={del} />
            </button>
          ) : (
            ""
          )}

          <div className={styles.timer_container}>
            <div className={styles.timer__time}>{`${min} : ${sec}`}</div>
            <div
              className={styles.timer__time_initial}
            >{`${initialMin} мин`}</div>
          </div>
        </div>

        {button ? (
          <button
            className={styles.timer__button}
            onClick={
              timerStatus ? () => handleTimerStop() : () => handleTimerStart()
            }
          >
            <img src={!timerStatus ? play : pause} />
          </button>
        ) : (
          ""
        )}

        {!button ? (
          <button
            className={styles.timer__button_delete}
            onClick={
              timerStatus ? () => handleTimerStop() : () => handleTimerStart()
            }
          >
            <img src={vector} />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Timer;
