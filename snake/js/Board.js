class Board {
  constructor(offsetX, offsetY) {
    this.rowsCount = offsetX;
    this.colsCount = offsetY;
    this.isPause = false;

    this.gameOver = document.querySelector('.game__over');
    this.scored = document.querySelector('.scored__table');
    this.gameBoard = document.querySelector('.game__board');
    this.pauseBtn = document.querySelector('.scored__pause');

    this.scored.innerHTML = 0;

    this.pauseBtn.addEventListener('click', () => this.isPause = !this.isPause);
    this.generateBoard();
  }
  generateBoard() {
    let tr, td;

    for (let y = 0; y < this.rowsCount; y++) {
      tr = document.createElement('tr');
      for (let x = 0; x < this.colsCount; x++) {
        td = document.createElement('td');//`<td data-x="${x}" data-y="${y}"></td>`;
        td.setAttribute('data-x', x);
        td.setAttribute('data-y', y);
        tr.appendChild(td);
      }
      this.gameBoard.appendChild(tr);
    }
  }
  createErrorMsg(text) {
    this.gameOver.innerHTML = text;
    this.gameOver.style.display = 'block';
  }
  addScore() {
    this.scored.innerText++;
  }
  reloadBoard() {
    this.gameOver.style.display = 'none';
    this.scored.innerHTML = 0;
    this.gameBoard.innerHTML = '';
    this.generateBoard();
  }
};