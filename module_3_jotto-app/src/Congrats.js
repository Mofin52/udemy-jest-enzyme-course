import React from "react";

const Congrats = ({ success }) => {
  return (
    <div data-test="component-congrats">
      <span data-test="congrats-message">
        {success && "Congratulations! You guessed the word!"}
      </span>
    </div>
  );
};

export default Congrats;
