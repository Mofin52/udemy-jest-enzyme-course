import React from "react";

export const ResetGameButton = ({ onClick, success, givenUp }) => {
  return (
    (success || givenUp) && (
      <button data-test={"reset-game-btn"} onClick={onClick}>
        Start new game
      </button>
    )
  );
};
