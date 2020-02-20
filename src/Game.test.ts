import Game, {
  DIRECTION_NONE,
  DIRECTION_TOP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  FIELD_SIZE,
  STANDARD_OFFSET,
  SNAKE_LENGTH,
} from './Game';
import mockGetRandomIn, { getRandomInteger as mockGetRandomInteger } from './random';

jest.mock('./random');

describe('Game', () => {
  describe('singleton', () => {
    it('should give you a new game when you call getInstance() for the 1st time', () => {
      // Arrange
      const expectedSize = FIELD_SIZE * FIELD_SIZE;
      const expectedFirstElement = { x: 1, y: 1 };
      const expectedLastElement = { x: FIELD_SIZE, y: FIELD_SIZE };

      // Act
      const actualGame = Game.instance;

      // Assert
      expect(actualGame).toBeInstanceOf(Game);
      expect(actualGame.isPlaying).toBe(true);
      expect(actualGame.freeSpace).toBeInstanceOf(Array);
      expect(actualGame.freeSpace.length).toEqual(expectedSize);
      expect(actualGame.freeSpace[0]).toEqual(expectedFirstElement);
      expect(actualGame.freeSpace[expectedSize - 1]).toEqual(expectedLastElement);
    });

    it('should return same instance when you call the game for the 2nd time', () => {
      // Arrange
      const expectedGame = Game.instance;
      // Act
      const actualGame = Game.instance;
      // Assert
      expect(actualGame).toBeInstanceOf(Game);
      expect(actualGame).toBe(expectedGame);
    });
  });

  describe('initDirection ( random [0-3] )', () => {
    const expectedMin = 0;
    const expectedMax = 3;

    afterEach(() => {
      const game = Game.instance;
      game.direction = DIRECTION_NONE;
    });

    describe('getRandomIn returned 0', () => {
      it('should set direction to the TOP', () => {
        // Arrange
        const expectedDirection = DIRECTION_TOP;
        const game = Game.instance;
        (mockGetRandomIn as jest.Mock).mockReturnValue(0);

        // Act
        game.initDirection();

        // Assert
        expect(game.direction).toEqual(expectedDirection);
        expect(mockGetRandomIn).toHaveBeenCalledWith(expectedMin, expectedMax);
      });
    });

    describe('getRandomIn returned 1', () => {
      it('should set direction to the RIGHT', () => {
        // Arrange
        const expectedDirection = DIRECTION_RIGHT;
        const game = Game.instance;
        (mockGetRandomIn as jest.Mock).mockReturnValue(1);

        // Act
        game.initDirection();

        // Assert
        expect(game.direction).toEqual(expectedDirection);
        expect(mockGetRandomIn).toHaveBeenCalledWith(expectedMin, expectedMax);
      });
    });
    describe('getRandomIn returned 2', () => {
      it('should set direction to DOWN', () => {
        // Arrange
        const expectedDirection = DIRECTION_DOWN;
        const game = Game.instance;
        (mockGetRandomIn as jest.Mock).mockReturnValue(2);

        // Act
        game.initDirection();

        // Assert
        expect(game.direction).toEqual(expectedDirection);
        expect(mockGetRandomIn).toHaveBeenCalledWith(expectedMin, expectedMax);
      });
    });

    describe('getRandomIn returned 3', () => {
      it('should set direction to the LEFT', () => {
        // Arrange
        const expectedDirection = DIRECTION_LEFT;
        const game = Game.instance;
        (mockGetRandomIn as jest.Mock).mockReturnValue(3);

        // Act
        game.initDirection();

        // Assert
        expect(game.direction).toEqual(expectedDirection);
        expect(mockGetRandomIn).toHaveBeenCalledWith(expectedMin, expectedMax);
      });
    });

    describe('direction is already set', () => {
      it('should throw an error', () => {
        // Arrange
        const expectedErrorMessage = 'Direction can only be initialized once';
        const game = Game.instance;
        game.direction = DIRECTION_TOP;

        // Act
        try {
          game.initDirection();
          expect(true).toEqual(false);
        } catch (actualError) {
          // Assert
          expect(actualError.message).toEqual(expectedErrorMessage);
        }
      });
    });
  });

  describe('direction setter', () => {
    afterAll(() => {
      const game = Game.instance;
      game.direction = DIRECTION_NONE;
    });

    describe('setting for the 1st time', () => {
      it('should update direction', () => {
        // Arrange
        const game = Game.instance;
        const expectedOldDirection = DIRECTION_NONE;
        const expectedNewDirection = DIRECTION_DOWN;
        game.direction = expectedOldDirection;

        // Act
        game.direction = expectedNewDirection;

        // Assert
        expect(game.direction).toEqual(expectedNewDirection);
      });
    });
    describe('resetting direction', () => {
      it('should update direction', () => {
        // Arrange
        const game = Game.instance;
        const expectedOldDirection = DIRECTION_DOWN;
        const expectedNewDirection = DIRECTION_NONE;
        game.direction = expectedOldDirection;

        // Act
        game.direction = expectedNewDirection;

        // Assert
        expect(game.direction).toEqual(expectedNewDirection);
      });
    });
    describe('reverse direction', () => {
      it('should not do anything', () => {
        // Arrange
        const game = Game.instance;
        const expectedOldDirection = DIRECTION_TOP;
        const expectedNewDirection = DIRECTION_DOWN;
        game.direction = expectedOldDirection;

        // Act
        game.direction = expectedNewDirection;

        // Assert
        expect(game.direction).toEqual(expectedOldDirection);
      });
    });

    describe('turn', () => {
      it('should update direction', () => {
        // Arrange
        const game = Game.instance;
        const expectedOldDirection = DIRECTION_RIGHT;
        const expectedNewDirection = DIRECTION_DOWN;
        game.direction = expectedOldDirection;

        // Act
        game.direction = expectedNewDirection;

        // Assert
        expect(game.direction).toEqual(expectedNewDirection);
      });
    });
  });

  describe('getRandomCoordinates', () => {
    describe('getRandomIn returns 10 for the 1st time, 5 for 2nd', () => {
      it('should return x=10 and y=5', () => {
        // Arrange
        const expectedOffset = 3;
        const expectedX = 10;
        const expectedY = 5;
        const expectedCoordinates = { x: expectedX, y: expectedY };
        const expectedMin = expectedOffset + 1;
        const expectedMax = FIELD_SIZE - expectedOffset;
        (mockGetRandomIn as jest.Mock).mockReturnValueOnce(expectedX).mockReturnValueOnce(expectedY);
        const game = Game.instance;

        // Act
        const actualCoordinates = game.getRandomCoordinates(expectedOffset);

        // Assert
        expect(actualCoordinates).toEqual(expectedCoordinates);
        expect(mockGetRandomIn).toHaveBeenCalledWith(expectedMin, expectedMax);
      });
    });
  });

  describe('spawnSnake', () => {
    describe(`snake's head is offset from the borders by body length (${SNAKE_LENGTH}) + standard offset (${STANDARD_OFFSET})`, () => {
      afterEach(() => {
        const game = Game.instance;
        game.snake = [];
      });

      describe('snake is already spawned', () => {
        it('should throw an error', () => {
          // Arrange
          const expectedMessage = 'Snake is already spawn!';
          const game = Game.instance;
          game.snake = [
            { x: 10, y: 15 },
            { x: 9, y: 15 },
            { x: 8, y: 15 },
            { x: 7, y: 15 },
          ];

          // Act
          try {
            game.spawnSnake();
            expect(true).toEqual(false);
          } catch (actualError) {
            // Assert
            expect(actualError.message).toEqual(expectedMessage);
          }
        });
      });
      describe('getRandomCoordinates returns x=10 and y=15', () => {
        let originalGetRandomCoordinates: any;
        let originalFreeSpace: any[];

        beforeAll(() => {
          const game = Game.instance;
          originalGetRandomCoordinates = game.getRandomCoordinates;
          originalFreeSpace = JSON.parse(JSON.stringify(game.freeSpace));
          game.getRandomCoordinates = jest.fn(() => ({ x: 10, y: 15 }));
        });

        afterEach(() => {
          const game = Game.instance;
          game.freeSpace = JSON.parse(JSON.stringify(originalFreeSpace));
        });

        afterAll(() => {
          const game = Game.instance;
          game.getRandomCoordinates = originalGetRandomCoordinates;
        });

        describe('direction is not set', () => {
          it('should throw an error', () => {
            // Arrange
            const expectedMessage = 'You should specify direction first';
            const game = Game.instance;

            // Act
            try {
              game.spawnSnake();
              expect(true).toEqual(false);
            } catch (actualError) {
              // Assert
              expect(actualError.message).toEqual(expectedMessage);
            }
          });
        });

        describe('direction - TOP', () => {
          it('should spawn snake heading to the the top and reduce free space', () => {
            // Arrange
            const expectedOffset = STANDARD_OFFSET + SNAKE_LENGTH;
            const expectedSnake = [
              { x: 10, y: 15 },
              { x: 10, y: 16 },
              { x: 10, y: 17 },
              { x: 10, y: 18 },
            ];
            const expectedFreeSpaceSize = FIELD_SIZE * FIELD_SIZE - 4;
            const game = Game.instance;
            game.direction = DIRECTION_TOP;

            // Act
            game.spawnSnake();

            // Assert
            expect(game.getRandomCoordinates).toHaveBeenCalledWith(expectedOffset);
            expect(game.snake).toEqual(expectedSnake);
            expect(game.freeSpace.length).toEqual(expectedFreeSpaceSize);
          });
        });
        describe('direction - RIGHT', () => {
          it('should spawn snake heading to the the right and reduce free space', () => {
            // Arrange
            const expectedOffset = STANDARD_OFFSET + SNAKE_LENGTH;
            const expectedSnake = [
              { x: 10, y: 15 },
              { x: 9, y: 15 },
              { x: 8, y: 15 },
              { x: 7, y: 15 },
            ];
            const expectedFreeSpaceSize = FIELD_SIZE * FIELD_SIZE - 4;
            const game = Game.instance;
            game.direction = DIRECTION_RIGHT;

            // Act
            game.spawnSnake();

            // Assert
            expect(game.getRandomCoordinates).toHaveBeenCalledWith(expectedOffset);
            expect(game.snake).toEqual(expectedSnake);
            expect(game.freeSpace.length).toEqual(expectedFreeSpaceSize);
          });
        });
        describe('direction - DOWN', () => {
          it('should spawn snake heading down and reduce free space', () => {
            // Arrange
            const expectedOffset = STANDARD_OFFSET + SNAKE_LENGTH;
            const expectedSnake = [
              { x: 10, y: 15 },
              { x: 10, y: 14 },
              { x: 10, y: 13 },
              { x: 10, y: 12 },
            ];
            const expectedFreeSpaceSize = FIELD_SIZE * FIELD_SIZE - 4;
            const game = Game.instance;
            game.direction = DIRECTION_DOWN;

            // Act
            game.spawnSnake();

            // Assert
            expect(game.getRandomCoordinates).toHaveBeenCalledWith(expectedOffset);
            expect(game.snake).toEqual(expectedSnake);
            expect(game.freeSpace.length).toEqual(expectedFreeSpaceSize);
          });
        });
        describe('direction - LEFT', () => {
          it('should spawn snake heading to the the left and reduce free space', () => {
            // Arrange
            const expectedOffset = STANDARD_OFFSET + SNAKE_LENGTH;
            const expectedSnake = [
              { x: 10, y: 15 },
              { x: 11, y: 15 },
              { x: 12, y: 15 },
              { x: 13, y: 15 },
            ];
            const expectedFreeSpaceSize = FIELD_SIZE * FIELD_SIZE - 4;
            const game = Game.instance;
            game.direction = DIRECTION_LEFT;

            // Act
            game.spawnSnake();

            // Assert
            expect(game.getRandomCoordinates).toHaveBeenCalledWith(expectedOffset);
            expect(game.snake).toEqual(expectedSnake);
            expect(game.freeSpace.length).toEqual(expectedFreeSpaceSize);
          });
        });
      });
    });
  });

  describe('spawnFood', () => {
    let originalFreeSpace: any[];

    beforeAll(() => {
      const game = Game.instance;
      originalFreeSpace = JSON.parse(JSON.stringify(game.freeSpace));
    });

    afterEach(() => {
      const game = Game.instance;
      game.freeSpace = JSON.parse(JSON.stringify(originalFreeSpace));
    });

    describe('no free space left', () => {
      it('should end the game', () => {
        // Arrange
        const expectedErrorMessage = "Can't spawn food. No free space left.";
        const game = Game.instance;
        game.freeSpace = [];

        // Act
        try {
          game.spawnFood();
          expect(true).toBe(false);
        } catch (actualError) {
          // Assert
          expect(actualError.message).toEqual(expectedErrorMessage);
        }
      });
    });

    describe('getRandomInteger returns 1', () => {
      it('should spawn a food', () => {
        // Arrange
        const game = Game.instance;
        const expectedFood = { x: 2, y: 1 };
        (mockGetRandomInteger as jest.Mock).mockReturnValue(1);
        const expectedFreeSpaceSize = 3;
        game.freeSpace = [{ x: 1, y: 1 }, expectedFood, { x: 3, y: 1 }];

        // Act
        game.spawnFood();

        // Assert
        expect(mockGetRandomInteger).toHaveBeenCalledWith(expectedFreeSpaceSize);
        expect(game.food).toEqual(expectedFood);
      });
    });
  });

  describe('isEating', () => {
    describe('not eating', () => {
      it('should be false', () => {
        // Arrange
        const game = Game.instance;
        game.snake = [{ x: 1, y: 1 }];
        game.food = { x: 3, y: 3 };

        // Act
        const actualIsEating = game.isEating;

        // Assert
        expect(actualIsEating).toBe(false);
      });
    });

    describe('eating', () => {
      it('should be true', () => {
        // Arrange
        const game = Game.instance;
        game.snake = [
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ];
        game.food = { x: 1, y: 1 };

        // Act
        const actualIsEating = game.isEating;

        // Assert
        expect(actualIsEating).toBe(true);
      });
    });
  });

  describe('checkGameOver', () => {
    describe('all fine', () => {
      it('should not do anything', () => {
        // Arrange
        const expectedIsPlaying = true;

        const game = Game.instance;
        game.isPlaying = expectedIsPlaying;

        // Act
        game.checkGameOver();

        // Assert
        expect(game.isPlaying).toEqual(expectedIsPlaying);
      });
    });
    describe('self eating', () => {
      it('should stop the game', () => {
        // Arrange
        const expectedIsPlaying = false;
        const expectedSnake = [
          { x: 4, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
          { x: 5, y: 2 },
          { x: 4, y: 2 },
          { x: 3, y: 2 },
        ];

        const game = Game.instance;
        game.snake = expectedSnake;

        // Act
        game.checkGameOver();

        // Assert
        expect(game.isPlaying).toEqual(expectedIsPlaying);
      });
    });
  });

  describe('moveHead', () => {
    describe('within game field', () => {
      describe('direction - TOP', () => {
        it('should add a new segment with Y decreased by 1', () => {
          // Arrange
          const expectedNewHead = { x: 2, y: 2 };
          const expectedSnake = [
            { x: 2, y: 3 },
            { x: 2, y: 4 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 2, y: 3 }, { x: 2, y: 4 }];
          const expectedFreeSpace = [{ x: 1, y: 1 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 1, y: 1 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_TOP;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - RIGHT', () => {
        it('should add a new segment with X increased by 1', () => {
          // Arrange
          const expectedNewHead = { x: 3, y: 3 };
          const expectedSnake = [
            { x: 2, y: 3 },
            { x: 2, y: 4 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 2, y: 3 }, { x: 2, y: 4 }];
          const expectedFreeSpace = [{ x: 1, y: 1 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 1, y: 1 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_RIGHT;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - DOWN', () => {
        it('should add a new segment with Y increased by 1', () => {
          // Arrange
          const expectedNewHead = { x: 2, y: 4 };
          const expectedSnake = [
            { x: 2, y: 3 },
            { x: 2, y: 2 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 2, y: 3 }, { x: 2, y: 2 }];
          const expectedFreeSpace = [{ x: 1, y: 1 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 1, y: 1 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_DOWN;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - LEFT', () => {
        it('should add a new segment with X decreased by 1', () => {
          // Arrange
          const expectedNewHead = { x: 1, y: 3 };
          const expectedSnake = [
            { x: 2, y: 3 },
            { x: 2, y: 4 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 2, y: 3 }, { x: 2, y: 4 }];
          const expectedFreeSpace = [{ x: 1, y: 1 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 1, y: 1 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_LEFT;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
    });
    describe('teleport', () => {
      describe('direction - TOP', () => {
        it(`should add a new segment with Y = ${FIELD_SIZE}`, () => {
          // Arrange
          const expectedNewHead = { x: FIELD_SIZE, y: FIELD_SIZE };
          const expectedSnake = [
            { x: FIELD_SIZE, y: 1 },
            { x: FIELD_SIZE, y: 2 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: FIELD_SIZE, y: 1 }, { x: FIELD_SIZE, y: 2 }];
          const expectedFreeSpace = [{ x: 3, y: 3 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 3, y: 3 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_TOP;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - RIGHT', () => {
        it('should add a new segment with X = 1', () => {
          // Arrange
          const expectedNewHead = { x: 1, y: 1 };
          const expectedSnake = [
            { x: FIELD_SIZE, y: 1 },
            { x: FIELD_SIZE, y: 2 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: FIELD_SIZE, y: 1 }, { x: FIELD_SIZE, y: 2 }];
          const expectedFreeSpace = [{ x: 3, y: 3 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 3, y: 3 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_RIGHT;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - DOWN', () => {
        it('should add a new segment with Y = 1', () => {
          // Arrange
          const expectedNewHead = { x: 1, y: 1 };
          const expectedSnake = [
            { x: 1, y: FIELD_SIZE },
            { x: 1, y: FIELD_SIZE - 1 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 1, y: FIELD_SIZE }, { x: 1, y: FIELD_SIZE - 1 }];
          const expectedFreeSpace = [{ x: 3, y: 3 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 3, y: 3 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_DOWN;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
      describe('direction - LEFT', () => {
        it(`should add a new segment with X = ${FIELD_SIZE}`, () => {
          // Arrange
          const expectedNewHead = { x: FIELD_SIZE, y: FIELD_SIZE };
          const expectedSnake = [
            { x: 1, y: FIELD_SIZE },
            { x: 1, y: FIELD_SIZE - 1 },
          ];
          const expectedUpdatedSnake = [expectedNewHead, { x: 1, y: FIELD_SIZE }, { x: 1, y: FIELD_SIZE - 1 }];
          const expectedFreeSpace = [{ x: 3, y: 3 }, expectedNewHead];
          const expectedUpdatedFreeSpace = [{ x: 3, y: 3 }];

          const game = Game.instance;
          game.freeSpace = expectedFreeSpace;
          game.snake = expectedSnake;
          game.direction = DIRECTION_LEFT;

          // Act
          game.moveHead();

          // Assert
          expect(game.snake).toEqual(expectedUpdatedSnake);
          expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
        });
      });
    });
  });

  describe('moveTail', () => {
    it('should push old tail to the free space while moving snake', () => {
      // Arrange
      const expectedOldTail = { x: 3, y: 5 };
      const expectedSnake = [{ x: 3, y: 3 }, { x: 3, y: 4 }, expectedOldTail];
      const expectedUpdatedSnake = [
        { x: 3, y: 3 },
        { x: 3, y: 4 },
      ];
      const expectedFreeSpace = [{ x: 1, y: 1 }];
      const expectedUpdatedFreeSpace = [{ x: 1, y: 1 }, expectedOldTail];

      const game = Game.instance;
      game.freeSpace = expectedFreeSpace;
      game.snake = expectedSnake;

      // Act
      game.moveTail();

      // Assert
      expect(game.snake).toEqual(expectedUpdatedSnake);
      expect(game.freeSpace).toEqual(expectedUpdatedFreeSpace);
    });
  });

  describe('moveSnake', () => {
    let originalSpawnFood: any;
    let originalMoveHead: any;
    let originalMoveTail: any;
    let originalCheckGameOver: any;

    beforeEach(() => {
      const game = Game.instance;
      originalSpawnFood = game.spawnFood;
      originalMoveHead = game.moveHead;
      originalMoveTail = game.moveTail;
      originalCheckGameOver = game.checkGameOver;
      game.spawnFood = jest.fn();
      game.moveHead = jest.fn();
      game.moveTail = jest.fn();
      game.checkGameOver = jest.fn();
    });

    afterEach(() => {
      const game = Game.instance;
      game.spawnFood = originalSpawnFood;
      game.moveHead = originalMoveHead;
      game.moveTail = originalMoveTail;
      game.checkGameOver = originalCheckGameOver;
    });

    describe('not eating', () => {
      it('should update both head and tail of the snake, do not reduce free space', () => {
        // Arrange
        const game = Game.instance;
        jest.spyOn(game, 'isEating', 'get').mockReturnValue(false);

        // Act
        game.moveSnake();

        // Assert
        expect(game.moveHead).toHaveBeenCalled();
        expect(game.checkGameOver).toHaveBeenCalled();
        expect(game.moveTail).toHaveBeenCalled();
      });
    });
    describe('eating', () => {
      it('should update only head of the snake, free space reduced by 1, spawn new food', () => {
        // Arrange
        const game = Game.instance;
        jest.spyOn(game, 'isEating', 'get').mockReturnValue(true);

        // Act
        game.moveSnake();

        // Assert
        expect(game.moveHead).toHaveBeenCalled();
        expect(game.checkGameOver).toHaveBeenCalled();
        expect(game.spawnFood).toHaveBeenCalled();
        expect(game.moveTail).not.toHaveBeenCalled();
      });
    });
  });
});
