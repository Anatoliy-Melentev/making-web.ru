  const
    board = new Board(10, 10),
    p = new Point({ x: 1, y: 3}),
    snake = new Snake(p, 3),
    food = new Food(board.rowsCount,board.colsCount),

    upBtn = document.querySelector('#up'),
    leftBtn = document.querySelector('#left'),
    rightBtn = document.querySelector('#right'),
    downBtn = document.querySelector('#down');

  let
    bread = food.setFood(snake),
    reloadBtn = document.querySelector('.scored__reload'),
    interval = setInterval(() => runSnake(),500);

  snake.draw();
  bread.setPoint();

  window.addEventListener('keydown', e => {
    e.preventDefault();
    snake.changeDirection(e.code);
  }, true);

  upBtn.addEventListener('click', () => snake.changeDirection('ArrowUp'));
  leftBtn.addEventListener('click', () => snake.changeDirection('ArrowLeft'));
  rightBtn.addEventListener('click', () => snake.changeDirection('ArrowRight'));
  downBtn.addEventListener('click', () => snake.changeDirection('ArrowDown'));

  reloadBtn.addEventListener('click', () => {
    clearInterval(interval);
    board.reloadBoard();
    p.changePoint({ x: 1, y: 3});
    snake.reloadSnake(p, 3);
    snake.draw();
    bread = food.setFood(snake);
    bread.setPoint();
    interval = setInterval(() => runSnake(),500);
  });

  function runSnake() {
    if (board.isPause) {
      return;
    }
    if (snake.isWall(board)) {
      clearInterval(interval);
      board.createErrorMsg('Game Over!<br>Вы врезались в стену!');

      return false;
    }

    if (snake.isTail()) {
      clearInterval(interval);
      board.createErrorMsg('Game Over!<br>Вы съели свой хвост!');

      return false;
    }

    if (snake.eat(bread)) {
      bread = food.setFood(snake);
      bread.setPoint();
      board.addScore();
    } else {
      snake.move();
    }
  };
