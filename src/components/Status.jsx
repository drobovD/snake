import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  checkApple,
  moveSnake,
  setDirection,
  checkGameOver,
} from "../store/gameSlice";

const Status = () => {
  const status = useSelector((store) => store.game.status);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (status === "Restart") {
      window.location.reload();
      return;
    }

    if (status !== "Pause") startTimer();
    else stopTimer();
    dispatch(changeStatus());
  };

  let timer = useRef(null);
  const update = () => {
    dispatch(moveSnake());
    dispatch(setDirection());
    dispatch(checkApple());
    dispatch(checkGameOver());
  };
  const startTimer = () => (timer.current = setInterval(() => update(), 200));
  const stopTimer = () => clearInterval(timer.current);

  return (
    <div className="Status">
      <button className="start-button" onClick={clickHandler}>
        {status}
      </button>
    </div>
  );
};

export default Status;
