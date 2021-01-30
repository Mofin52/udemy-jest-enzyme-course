import React from "react";
import PropTypes from "prop-types";

const Congrats = ({ success }) => {
  return (
    <div data-test="component-congrats">
      <span data-test="congrats-message">
        {success && "Congratulations! You guessed the word!"}
      </span>
    </div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
