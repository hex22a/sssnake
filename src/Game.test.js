import Game, { DIRECTION_TOP, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT, FIELD_SIZE } from './Game';
import mockGetRandomIn from './random';

jest.mock('./random');

describe('Game', () => {
  describe('singleton', () => {
    it('throws error when trying to call constructor directly', () => {
      // Arrange
      const expectedErrorMessage = 'Game instance should be accessed via instance property';

      // Act
      try {
        const actualGame = new Game();
        expect(actualGame).toEqual(null); // should never reach this line, otherwise test will fail
      } catch (actualError) {
        // Assert
        expect(actualError.message).toEqual(expectedErrorMessage);
      }
    });

    it('should give you a new game when you call getInstance() for the 1st time', () => {
      // Arrange
      // Act
      const actualGame = Game.instance;
      // Assert
      expect(actualGame).toBeInstanceOf(Game);
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

    beforeEach(() => {
      const game = Game.instance;
      game.direction = null;
    });

    describe('getRandomIn returned 0', () => {
      it('should set direction to the TOP', () => {
        // Arrange
        const expectedDirection = DIRECTION_TOP;
        const game = Game.instance;
        mockGetRandomIn.mockReturnValue(0);

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
        mockGetRandomIn.mockReturnValue(1);

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
        mockGetRandomIn.mockReturnValue(2);

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
        mockGetRandomIn.mockReturnValue(3);

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
        mockGetRandomIn.mockReturnValueOnce(expectedX).mockReturnValueOnce(expectedY);
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
    describe("snake's head is offset from the borders by body length + 2", () => {
      // TODO To Be Done
    });
  });

  // describe('spawn snake', () => {
  //   describe('', () => {
  //
  //   });
  // });

  // describe('spawnFood', () => {
  //   it('should spawn a food in a random place', () => {
  //     // Arrange
  //
  //     // Act
  //
  //     // Assert
  //   });
  // });
});
