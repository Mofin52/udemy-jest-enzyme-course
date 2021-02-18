import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: null,
    };

    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(e) {
    e.preventDefault();
    const guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: "" });
    }
  }

  render() {
    const contents =
      this.props.success || this.props.givenUp ? null : (
        <form className="form-inline">
          <input
            value={this.state.currentGuess}
            onChange={(e) => this.setState({ currentGuess: e.target.value })}
            type="text"
            data-test="input-box"
            className="mb-2 mx-sm-3"
            placeholder="enter guess"
          />
          <button
            type="submit"
            data-test="submit-button"
            className="btn btn-primary"
            onClick={this.submitGuessedWord}
          >
            Submit
          </button>
        </form>
      );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success, givenUp }) => {
  return { success, givenUp };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
