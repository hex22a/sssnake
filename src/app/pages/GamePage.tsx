'use client';

import React, { useState, useEffect } from 'react';
import GameField from '../templates/GameField';

import Point from '../Point';
import Game, { DIRECTION_LEFT, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_TOP } from '../Game';


const useGame = () => {
  const [game, setGame] = useState<Game | undefined>();
  useEffect(() => {
    setGame(Game.instance);
  }, []);

  return game;
};


const GamePage = () => {
  const game = useGame();

  const [snake, setSnake] = useState(game?.snake);
  const [food, setFood] = useState(game?.food);


  useEffect(() => {
    game?.initDirection();
    game?.spawnSnake();
    game?.spawnFood();

    const updateFrame = (setSnake: React.Dispatch<React.SetStateAction<Point[]>>, setFood: React.Dispatch<React.SetStateAction<Point>>) => {
      if (game?.isPlaying) {
        game.moveSnake();
        setSnake([...game.snake]);
        setFood(game.food);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (game){
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
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(updateFrame, 100, setSnake, setFood);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [game]);

  return <GameField snake={snake || []} food={food || new Point(0, 0)} />;
};

export default GamePage;
