import React from "react";

export const TotalGuesses = ({ guesses }) => {
  return guesses !== 0 ? (
    <div data-test={"total-guesses"}>
      Total guesses: <span data-test={"total-guesses-value"}>{guesses}</span>
    </div>
  ) : null;
};
