import React, { useEffect, useState } from "react";

const Game = () => {
  const [lowerBound, setLowerBound] = useState(69);
  const [upperBound, setUpperBound] = useState(420);

  const [guess, setGuess] = useState(0);
  const [previosGuess, setPreviousGuess] = useState(undefined);

  const [numberToMatch, setNumberToMatch] = useState(333);

  const [guessMessage, setGuessMessage] = useState(
    "Try and guess the number I am thinking of! :D"
  );
  const [guessedState, setGuessedState] = useState(null);

  const handleLowerBoundChange = (e) => {
    if (parseFloat(e.target.value) > upperBound) {
      setUpperBound(parseFloat(e.target.value) + 1);
    }
    setLowerBound(parseFloat(e.target.value));
  };
  const handleUpperBoundChange = (e) => {
    if (parseFloat(e.target.value) < lowerBound) {
      setLowerBound(parseFloat(e.target.value) - 1);
    }
    setUpperBound(parseFloat(e.target.value));
  };
  const handleUserGuessChange = (e) => {
    if (e.target.value.length < 1) {
      setGuess(undefined);
      setGuessMessage(
        "Guess at least -10000000000, or even less. How many zero's can you actually fit in there..."
      );
      setGuessedState(null);
      return;
    }
    setGuess(parseFloat(e.target.value));
  };

  const generateNewNumberToGuess = () => {
    setNumberToMatch(
      Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
    );
  };

  useEffect(() => {
    generateNewNumberToGuess();
  }, [lowerBound, upperBound]);

  const handleGuess = (e) => {
    e.preventDefault();

    if (guess === undefined) {
      setGuessMessage("Guess at least -1000000000");
      setGuessedState(null);
      return;
    }

    let newMsg = "";
    if (guess < lowerBound || guess > upperBound) {
      setGuessMessage("Your guess is out of bounds... :P");
      setGuessedState(false);
      return;
    }

    if (guess === undefined) {
      newMsg = "Guess at least -1000000000";
      setGuessedState(null);
      return;
    }

    setPreviousGuess(guess);

    if (guess > numberToMatch) {
      newMsg = "Your guess is like Snoop Dogg, too high! Guess lower! :(";
      setGuessedState(false);
    }
    if (guess < numberToMatch) {
      newMsg = "Your guess is like Bitcoin price, too low! Guess higher! :(";
      setGuessedState(false);
    }

    if (guess === numberToMatch) {
      newMsg = "You guessed the number! Congratulations! Now guess again! ;D";
      setGuessedState(true);
      generateNewNumberToGuess();
    }
    setGuessMessage(newMsg);
  };

  return (
    <div className="game-box">
      <h1 className="margin_bottom-small">
        Guess The Number Between {lowerBound} and {upperBound}!
      </h1>

      <h3
        className={`${
          guessedState === true
            ? "correct"
            : guessedState === false
            ? "incorrect"
            : ""
        } margin_bottom-small`}
      >
        {guessMessage}
      </h3>
      <h4>Your previous guess: {previosGuess}</h4>

      <form onSubmit={(e) => handleGuess(e)}>
        <input
          type="number"
          value={guess ?? ""}
          onChange={(e) => handleUserGuessChange(e)}
          placeholder="Your Guess"
        />
        <div>
          <button className="w-100" onSubmit={(e) => handleGuess(e)}>
            Guess!
          </button>
        </div>
      </form>

      <div>
        <h2 className="margin_bottom-small">Game Configuration</h2>
        <div>
          <label className="margin_right-tiny" htmlFor="lowerBound">
            Lower Bound
          </label>
          <input
            className="w-50"
            type="number"
            name="lowerBound"
            placeholder="Lower Bound"
            value={lowerBound ?? ""}
            onChange={(e) => handleLowerBoundChange(e)}
          />
        </div>
        <label className="margin_right-tiny" htmlFor="upperBound">
          Upper Bound
        </label>
        <input
          className="w-50"
          type="number"
          name="upperBound"
          placeholder="Upper Bound"
          value={upperBound ?? ""}
          onChange={(e) => handleUpperBoundChange(e)}
        />
      </div>
      {/* {numberToMatch} */}
    </div>
  );
};

export default Game;
