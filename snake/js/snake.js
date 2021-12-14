class Snake  {
  constructor(tail, len, direction) {
    this.points = [];
    this.direction = direction || 'right';

    for (let i = 0; i < len; i++) {
      let p = new Point(tail, !i ? 'left' : (i + 1 === len ? 'right' : 'point'));
      p.move(i, this.direction);
      this.points.push(p);
    }
  }
  draw() {
    this.points.forEach(point => {
      point.setPoint();
    })
  }
  move() {
    const
      tail = this.points.shift(),
      head = this.nextPoint();

    tail.removePoint();
    head.setPoint();
    this.points.push(head);

    this.renderBody();
  }
  nextPoint() {
    const head = new Point(this.points[this.points.length - 1], this.direction);

    head.move(1, this.direction);
    return head;
  }
  changeDirection(keyCode) {
    switch (keyCode) {
      case 'ArrowUp':
        if (this.direction !== 'down')
            this.direction = 'up';
        break;
      case 'ArrowDown':
        if (this.direction !== 'up')
          this.direction = 'down';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right')
          this.direction = 'left';
        break;
      case 'ArrowRight':
        if (this.direction !== 'left')
          this.direction = 'right';
        break;
    }
  }

  eat(food) {
    const head = this.nextPoint();
    if (head.isHit(food)) {
      food.removePoint();
      food.className = head.className;
      this.points.push(food);
      this.renderBody();
      food.setPoint();

      return true;
    } else {
      return false;
    }
  }
  isWall(board) {
    const head = this.nextPoint();
    return head.isHitTheWall(board);
  }
  isTail() {
    let
      head = this.nextPoint(),
      isTail = false;

    this.points.forEach(point => {
      if (point.x === head.x && point.y === head.y) {
        isTail = true;
      }
    });
    return isTail;
  }
  reloadSnake(tail, len) {
    this.points = [];
    this.direction = 'right';

    for (let i = 0; i < len; i++) {
      let p = new Point(tail, !i ? 'left' : (i + 1 === len ? 'right' : 'point'));
      p.move(i, this.direction);
      this.points.push(p);
    }
  }
  renderBody() {
    this.points.forEach((p, i) => {
      const o = this.points[i - 1], n = this.points[i + 1];
      if (o && n) {
        if (o.x === p.x && n.x === p.x || o.y === p.y && n.y === p.y) {
          p.changeClass('point');
        } else if (o.x === p.x && n.y === p.y) {
          if (o.y > p.y) p.changeClass(n.x > p.x ? 'tl' : 'tr');
          else p.changeClass(n.x > p.x ? 'bl' : 'br');
        } else if (o.y === p.y && n.x === p.x){
          if (o.x > p.x) p.changeClass(n.y > p.y ? 'tl' : 'bl');
          else p.changeClass(n.y > p.y ? 'tr' : 'br');
        }
      } else if (!o) {
        if (n.x === p.x)
          p.changeClass(n.y > p.y ? 'up' : 'down');
        else if (n.y === p.y)
          p.changeClass(n.x > p.x ? 'left' : 'right');
      }
    });
  }
}