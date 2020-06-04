import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdote, anecdoteVotes }) => (
  <div>
    {anecdote} <br /> has {anecdoteVotes} votes
  </div>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  ); // Init as an empty array with length of anecdotes

  const voteForAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const selectRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const getMaxVoteIndex = () => votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote
        anecdote={anecdotes[selected]}
        anecdoteVotes={votes[selected]}
      />
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anegdote</button>
      <h2>Anecdote with the most votes</h2>
      <Anecdote
        anecdote={anecdotes[getMaxVoteIndex()]}
        anecdoteVotes={votes[getMaxVoteIndex()]}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
