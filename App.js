import React, {useState} from 'react';
import Game from './src/components/Game';
import shuffle from 'lodash.shuffle';

const App = () => {
  const [gameId, setGameId] = useState(0);
  const [randomNumber, setRandomNumber] = useState(6);
  const resetGame = () => {
    setGameId(prevState => prevState + 1);
  };

  const initialSeconds = 10;
  const randNumArray = Array.from({length: randomNumber}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  const target = randNumArray
    .slice(0, randomNumber - 3)
    .reduce((acc, cur) => acc + cur);

  const shuffledRandomArray = shuffle(randNumArray);
  console.log(shuffledRandomArray);
  return (
    <Game
      key={gameId}
      reset={resetGame}
      randNumArray={shuffledRandomArray}
      randomNumber={randomNumber}
      initialSeconds={initialSeconds}
      target={target}
    />
  );
};

export default App;
