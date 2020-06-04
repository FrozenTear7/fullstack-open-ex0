import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClickHandler, text }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const scoreCount = good + neutral + bad;

  const calculateAvgScore = () => (good - bad) / scoreCount || 0;

  const calculatePositivePercent = () => (good / scoreCount) * 100 || 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={scoreCount} />
          <Statistic text="average" value={calculateAvgScore()} />
          <Statistic
            text="positive"
            value={calculatePositivePercent() + " %"}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClickHandler={() => setGood(good + 1)} text="good" />
      <Button onClickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClickHandler={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
