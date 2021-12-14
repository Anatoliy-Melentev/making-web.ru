class Point {
  constructor({x ,y}, className) {
    this.x = x;
    this.y = y;
    this.className = className || 'point';
  }
  getPos() {
    return document.querySelector(`[data-x='${this.x}'][data-y='${this.y}']`)
  }
  setPoint() {
    this.getPos().classList.add(this.className);
  }
  removePoint() {
    this.getPos().className = '';
  }
  move(offset, direction) {
    switch (direction) {
      case 'right': this.x += offset; break;
      case 'left': this.x -= offset; break;
      case 'up': this.y -= offset; break;
      case 'down': this.y += offset; break;
    }
  }
  isHit(p) {
    return p.x === this.x && p.y === this.y;
  }
  isHitTheWall(board) {
    return this.x >= board.rowsCount || this.x < 0 || this.y >= board.colsCount || this.y < 0;
  }
  changePoint({x,y}) {
    this.x = x;
    this.y = y;
  }
  changeClass(Cls) {
    this.getPos().classList.remove(this.className);
    this.getPos().classList.add(Cls);
  }
}