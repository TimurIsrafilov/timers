import { useNavigate } from "react-router-dom";

import styles from "./header.module.css";

function Header() {
  const navigate = useNavigate();

  const currentUrl = window.location.pathname.split("/").pop();

  let buttonText;
  let linkToFollow;
  let addButton;
  let title;

  if (currentUrl === "") {
    buttonText = "Править";
    linkToFollow = "/edit";
    addButton = true;
    title = "Таймеры";
  } else if (currentUrl === "add") {
    buttonText = "Отменить";
    linkToFollow = "/";
    addButton = false;
    title = "Таймер";
  } else if (currentUrl === "edit") {
    buttonText = "Готово";
    linkToFollow = "/";
    addButton = true;
    title = "Таймеры";
  } else if (currentUrl === "run") {
    buttonText = "Таймеры";
    linkToFollow = "/";
    addButton = false;
    title = null;
  }

  return (
    <div>
      <div className={styles.header}>
        <button
          className={styles.header__button_edit}
          onClick={() => navigate(linkToFollow, { replace: true })}
        >
          {buttonText}
        </button>
        {addButton ? (
          <button
            className={styles.header__button_add}
            onClick={() => navigate("/add", { replace: true })}
          ></button>
        ) : null}
      </div>
      {title ? <h1 className={styles.header__title}>{title}</h1> : null}
    </div>
  );
}

export default Header;
