function write() {
  let linesWrite = document.getElementById("numberLines").value;
  let phrase = document.getElementById("phrase");
  let i = 0;
  while (i < linesWrite) {
      phrase.textContent += "Alguma criança ainda faz isso? Agua bebe grava";
      i++;
  }
}

function countLines() {
  let board = document.getElementById('blackboard');
  let boardHeight = board.offsetHeight;
  let lineHeight = parseInt(board.style.lineHeight);
  let lines = boardHeight / lineHeight;
  let boardLines = document.getElementById("lines");
  console.log(boardHeight);
  console.log(lineHeight);
  boardLines.textContent = lines;
}

write();

function reload() {
  let linesWrite = document.getElementById("numberLines").value;
  let phrase = document.getElementById("phrase");
  phrase.textContent = '';
  write();
  countLines();
}