import getRandomIn from './random';

export const FIELD_SIZE = 50;
export const STANDARD_OFFSET = 2;
export const SNAKE_LENGTH = 4;

export const DIRECTION_TOP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

// eslint-disable-next-line quotes
const singletonEnforcer = Symbol("don't mess with a constructor");
const singleton = Symbol('singleton');

export default class Game {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Game instance should be accessed via instance property');
    }
    this.direction = null;
    this.snake = [];
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Game(singletonEnforcer);
    }

    return this[singleton];
  }

  initDirection() {
    if (this.direction !== null) throw new Error('Direction can only be initialized once');
    this.direction = getRandomIn(0, 3);
  }

  getRandomCoordinates(offset) {
    return { x: getRandomIn(offset + 1, FIELD_SIZE - offset), y: getRandomIn(offset + 1, FIELD_SIZE - offset) };
  }

  spawnSnake() {
    if (Array.isArray(this.snake) && this.snake.length !== 0) throw new Error('Snake is already spawn!');
    if (this.direction === null) throw new Error('You should specify direction first');
    const head = this.getRandomCoordinates(SNAKE_LENGTH + STANDARD_OFFSET);
    this.snake.push(head);
    switch (this.direction) {
      case DIRECTION_TOP:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          this.snake.push({ x: head.x, y: head.y + i });
        }
        break;
      case DIRECTION_RIGHT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          this.snake.push({ x: head.x - i, y: head.y });
        }
        break;
      case DIRECTION_DOWN:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          this.snake.push({ x: head.x, y: head.y - i });
        }
        break;
      case DIRECTION_LEFT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          this.snake.push({ x: head.x + i, y: head.y });
        }
        break;
      default:
        console.error('I wish if JS had enums 😭');
    }
  }
}
