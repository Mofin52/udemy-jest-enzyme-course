import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState("");

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={() => {
          setCount(count + 1);
          setError("");
        }}
      >
        Increment counter
      </button>
      <button
        data-test="decrement-button"
        onClick={() => {
          const newCount = count - 1;
          if (newCount < 0) {
            setError("Counter can't go below zero");
          }
          setCount(Math.max(newCount, 0));
        }}
      >
        Decrement counter
      </button>
      <p data-test="error-message">{error}</p>
    </div>
  );
}

export default App;
