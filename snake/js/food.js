class Food {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.className = 'food';
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  createCoords(snake) {
    const newCoords = {
      x: this.getRandomInt(this.width),
      y: this.getRandomInt(this.height),
    };

    let isTail = false;
    snake.points.forEach(point => {
      if (point.x === newCoords.x && point.y === newCoords.y) {
        isTail = true;
        return false;
      }
    });

    if (isTail) {
      this.createCoords(snake);
      return false;
    }
    return newCoords;
  }
  setFood(snake) {
    let newCoords = false;
    do {
      newCoords = this.createCoords(snake);
    } while (!newCoords)

    return new Point(newCoords, this.className);
  }
}