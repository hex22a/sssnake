import getRandomIn from './random';

export const FIELD_SIZE = 50;

export const DIRECTION_TOP = 0;
export const DIRECTION_RIGHT = 1;
export const DIRECTION_DOWN = 2;
export const DIRECTION_LEFT = 3;

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol("don't mess with a constructor");

export default class Game {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Game instance should be accessed via instance property');
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
}
