import React from "react";
import { useSelector } from "react-redux";

const Square = ({ square }) => {
  const { x, y } = square;
  const snake = useSelector((store) => store.game.snake);
  const apple = useSelector((store) => store.game.apple);

  let buttonStyle = "";

  for (let snakePart of snake) {
    if (snakePart.x === x && snakePart.y === y) buttonStyle = "snake";
  }

  if (x === apple.x && y === apple.y) buttonStyle = "apple";

  return (
    <span className="Square">
      <button className={buttonStyle}></button>
    </span>
  );
};

export default Square;
