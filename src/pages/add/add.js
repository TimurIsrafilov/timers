import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import styles from "./add.module.css";

function Add(props) {
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const navigate = useNavigate();

  function handleMinChange(e) {
    setMin(e.target.value);
  }

  function handleSecChange(e) {
    setSec(e.target.value);
  }

  const time = Number(min) * 60 + Number(sec);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddTimer({
      time: time,
      initial: time,
      id: uuidv4(),
    });

    navigate("/run", { replace: true });
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__input_container}>
          <input
            className={styles.form__input}
            type="number"
            id="min"
            name="min"
            value={min || ""}
            placeholder="0"
            max="59"
            min="0"
            onChange={handleMinChange}
          />

          <span className={styles.form__input_title}>мин</span>
          <input
            className={styles.form__input}
            type="number"
            id="sec"
            name="sec"
            value={sec || ""}
            placeholder="0"
            max="99"
            min="0"
            onChange={handleSecChange}
          />
          <span className={styles.form__input_title}>сек</span>
        </div>
        <button className={styles.form__button}>Старт</button>
      </form>
    </div>
  );
}

export default Add;
