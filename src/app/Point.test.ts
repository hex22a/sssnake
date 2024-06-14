import Point from './Point';


describe('Point', () => {
  describe('#constructor', () => {
    it('should create an instance with X = 0 Y = 0 when no arguments passed', () => {
      // Arrange
      const expectedX = 0;
      const expectedY = 0;
      // Act
      const actualPoint: Point = new Point();
      // Assert
      expect(actualPoint).toBeInstanceOf(Point);
      expect(actualPoint.x).toEqual(expectedX);
      expect(actualPoint.y).toEqual(expectedY);

    });
    it('should create an instance when X and Y passed', () => {
      // Arrange
      const expectedX = 1;
      const expectedY = 2;
      // Act
      const actualPoint: Point = new Point(expectedX, expectedY);
      // Assert
      expect(actualPoint).toBeInstanceOf(Point);
      expect(actualPoint.x).toEqual(expectedX);
      expect(actualPoint.y).toEqual(expectedY);
    });
  });
});
