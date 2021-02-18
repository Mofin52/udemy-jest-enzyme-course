import React, { Component } from "react";
import { connect } from "react-redux";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import "./App.css";
import { getSecretWord, resetGame } from "./actions";
import Input from "./Input";
import { TotalGuesses } from "./TotalGuesses";
import { ResetGameButton } from "./ResetGameButton";
import GiveUpButton from "./GiveUpButton";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <GiveUpButton />
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuesses guessed={this.props.guessedWords.length} />
        <ResetGameButton
          givenUp={this.props.givenUp}
          success={this.props.success}
          onClick={this.props.resetGame}
          data-test="reset-btn-component"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord, givenUp } = state;
  return { success, guessedWords, secretWord, givenUp };
};

export default connect(mapStateToProps, { getSecretWord, resetGame })(
  UnconnectedApp
);
