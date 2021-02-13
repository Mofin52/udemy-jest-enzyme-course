import React from "react";

export const ResetGameButton = ({ onClick, success }) => {
  return (
    success && (
      <button data-test={"reset-game-btn"} onClick={onClick}>
        Start new game
      </button>
    )
  );
};
