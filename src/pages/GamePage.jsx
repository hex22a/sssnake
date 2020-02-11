import React, { useState, useEffect } from 'react';
import GameField from '../templates/GameField';

import Game, { DIRECTION_LEFT, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_TOP } from '../Game';

const game = Game.instance;
game.initDirection();
game.spawnSnake();
game.spawnFood();

const updateFrame = (setSnake, setFood) => {
  game.moveSnake();
  console.info(game.snake);
  setSnake([...game.snake]);
  setFood(game.food);
};

const handleKeyPress = event => {
  switch (event.key) {
    case 'ArrowLeft':
      game.direction = DIRECTION_LEFT;
      break;
    case 'ArrowRight':
      game.direction = DIRECTION_RIGHT;
      break;
    case 'ArrowUp':
      game.direction = DIRECTION_TOP;
      break;
    case 'ArrowDown':
      game.direction = DIRECTION_DOWN;
      break;
    default:
      console.info(event.key);
  }
};

const GamePage = () => {
  const [snake, setSnake] = useState(game.snake);
  const [food, setFood] = useState(game.food);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(updateFrame, 100, setSnake, setFood);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, []);

  return <GameField snake={snake} food={food} />;
};

export default GamePage;
