import getRandomIn, { getRandomInteger } from './random';

export const FIELD_SIZE = 50;
export const STANDARD_OFFSET = 2;
export const SNAKE_LENGTH = 4;

export const DIRECTION_NONE = -1;
export const DIRECTION_TOP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

export default class Game {
  private static gameInstance: Game;

  public isPlaying: boolean;

  private _direction: number;

  public snake: any[];

  public freeSpace: any[];

  public food: any;

  private constructor() {
    this._direction = DIRECTION_NONE;
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
    if (!this.gameInstance) {
      this.gameInstance = new Game();
    }

    return this.gameInstance;
  }

  set direction(newDirection: number) {
    if (
      newDirection === DIRECTION_NONE ||
      this._direction === DIRECTION_NONE ||
      ((this._direction === DIRECTION_TOP || this._direction === DIRECTION_DOWN) &&
        (newDirection === DIRECTION_RIGHT || newDirection === DIRECTION_LEFT)) ||
      ((this._direction === DIRECTION_RIGHT || this._direction === DIRECTION_LEFT) &&
        (newDirection === DIRECTION_DOWN || newDirection === DIRECTION_TOP))
    ) {
      this._direction = newDirection;
    }
  }

  get direction(): number {
    return this._direction;
  }

  initDirection() {
    if (this.direction !== DIRECTION_NONE) throw new Error('Direction can only be initialized once');
    this.direction = getRandomIn(0, 3);
  }

  getRandomCoordinates(offset: number) {
    return { x: getRandomIn(offset + 1, FIELD_SIZE - offset), y: getRandomIn(offset + 1, FIELD_SIZE - offset) };
  }

  spawnSnake() {
    if (Array.isArray(this.snake) && this.snake.length !== 0) throw new Error('Snake is already spawn!');
    if (this.direction === DIRECTION_NONE) throw new Error('You should specify direction first');

    const head = this.getRandomCoordinates(SNAKE_LENGTH + STANDARD_OFFSET);
    this.snake.push(head);
    let tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === head.x && coordinate.y === head.y);
    this.freeSpace.splice(tbr, 1);

    switch (this.direction) {
      case DIRECTION_TOP:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x, y: head.y + i };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_RIGHT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x - i, y: head.y };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_DOWN:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x, y: head.y - i };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      case DIRECTION_LEFT:
        for (let i = 1; i < SNAKE_LENGTH; i += 1) {
          const segment = { x: head.x + i, y: head.y };
          this.snake.push(segment);
          tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === segment.x && coordinate.y === segment.y);
          this.freeSpace.splice(tbr, 1);
        }
        break;
      default:
        console.error('I wish if JS had enums 😭');
    }
  }

  spawnFood() {
    if (Array.isArray(this.freeSpace) && this.freeSpace.length === 0) {
      throw new Error("Can't spawn food. No free space left.");
    } else {
      this.food = this.freeSpace[getRandomInteger(this.freeSpace.length)];
    }
  }

  get isEating() {
    return this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
  }

  checkGameOver() {
    const [head, ...body] = this.snake;
    if (body.find((coordinate) => coordinate.x === head.x && coordinate.y === head.y)) {
      this.isPlaying = false;
    }
  }

  moveHead() {
    let newHead: any;
    let newCoordinate: any;
    switch (this.direction) {
      case DIRECTION_TOP:
        newHead = { x: this.snake[0].x, y: this.snake[0].y - 1 || FIELD_SIZE };
        break;
      case DIRECTION_RIGHT:
        newCoordinate = this.snake[0].x + 1;
        newHead = { x: newCoordinate > FIELD_SIZE ? 1 : newCoordinate, y: this.snake[0].y };
        break;
      case DIRECTION_DOWN:
        newCoordinate = this.snake[0].y + 1;
        newHead = { x: this.snake[0].x, y: newCoordinate > FIELD_SIZE ? 1 : newCoordinate };
        break;
      case DIRECTION_LEFT:
        newHead = { x: this.snake[0].x - 1 || FIELD_SIZE, y: this.snake[0].y };
        break;
      default:
        console.error('This is 2D snake paw 🐍');
    }
    this.snake.unshift(newHead);
    const tbr = this.freeSpace.findIndex((coordinate) => coordinate.x === newHead.x && coordinate.y === newHead.y);
    this.freeSpace.splice(tbr, 1);
  }

  moveTail() {
    this.freeSpace.push(this.snake[this.snake.length - 1]);
    this.snake.pop();
  }

  moveSnake() {
    this.moveHead();
    this.checkGameOver();
    if (this.isEating) {
      this.spawnFood();
    } else {
      this.moveTail();
    }
  }
}
