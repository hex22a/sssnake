import getRandomIn, { getRandomInteger } from './random';

export const FIELD_SIZE = 50;
export const STANDARD_OFFSET = 2;
export const SNAKE_LENGTH = 4;

export const DIRECTION_TOP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

const singletonEnforcer = Symbol("don't mess with a constructor");
const singleton = Symbol('singleton');

export default class Game {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Game instance should be accessed via instance property');
    }
    this.direction = null;
    this.snake = [];
    this.isPlaying = true;
    const freeSpaceArrayLength = FIELD_SIZE * FIELD_SIZE;
    this.freeSpace = new Array(freeSpaceArrayLength);
    for (let i = 0; i < freeSpaceArrayLength; i += 1) {
      // Caution! Computer science below
      // eslint-disable-next-line no-bitwise
      this.freeSpace[i] = { x: (i % FIELD_SIZE) + 1, y: ~~(i / FIELD_SIZE) + 1 };
    }
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
    let tbr = this.freeSpace.findIndex(coordinate => coordinate.x === head.x && coordinate.y === head.y);
    this.freeSpace.splice(tbr, 1);

    switch (this.direction) {
      case DIRECTION_TOP:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x, y: head.y + i };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex(coordinate => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_RIGHT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x - i, y: head.y };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex(coordinate => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_DOWN:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x, y: head.y - i };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex(coordinate => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_LEFT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x + i, y: head.y };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex(coordinate => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      default:
        console.error('I wish if JS had enums 😭');
    }
  }

  spawnFood() {
    if (Array.isArray(this.freeSpace) && this.freeSpace.length === 0) {
      this.isPlaying = false;
    } else {
      this.food = this.freeSpace[getRandomInteger(this.freeSpace.length)];
    }
  }

  get isEating() {
    return this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
  }

  moveSnake() {
    let newHead;
    switch (this.direction) {
      case DIRECTION_TOP:
        newHead = { x: this.snake[0].x, y: this.snake[0].y - 1 };
        break;
      case DIRECTION_RIGHT:
        newHead = { x: this.snake[0].x + 1, y: this.snake[0].y };
        break;
      case DIRECTION_DOWN:
        newHead = { x: this.snake[0].x, y: this.snake[0].y + 1 };
        break;
      case DIRECTION_LEFT:
        newHead = { x: this.snake[0].x - 1, y: this.snake[0].y };
        break;
      default:
        console.error('This is 2D snake paw 🐍');
    }
    this.snake.unshift(newHead);
    const tbr = this.freeSpace.findIndex(coordinate => coordinate.x === newHead.x && coordinate.y === newHead.y);
    this.freeSpace.splice(tbr, 1);
    if (this.isEating) {
      this.spawnFood();
    } else {
      this.freeSpace.push(this.snake[this.snake.length - 1]);
      this.snake.pop();
    }
  }
}
