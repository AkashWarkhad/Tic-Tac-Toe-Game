// ----------------------------
// Element Selectors
// ----------------------------
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#newGame-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Winning Patterns
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Random first turn
let isOTurn = Math.random() > 0.5;
let gameOver = false;

// ----------------------------
// Event Listeners
// ----------------------------
boxes.forEach((box) => {
  box.addEventListener("click", () => handleBoxClick(box));
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// ----------------------------
// MAIN GAME LOGIC
// ----------------------------
function handleBoxClick(box) {
  if (gameOver) return;

  box.innerText = isOTurn ? "O" : "X";
  box.style.color = isOTurn ? "green" : "red";
  box.disabled = true;

  // Click animation
  box.classList.add("clicked");
  setTimeout(() => box.classList.remove("clicked"), 200);

  isOTurn = !isOTurn;

  if (checkWinner()) return;
  checkTie();
}

// ----------------------------
// WIN CHECK
// ----------------------------
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      highlightWinner(pattern);
      showWinner(val1);
      gameOver = true;
      return true;
    }
  }
  return false;
}

function highlightWinner(pattern) {
  pattern.forEach(i => {
    boxes[i].classList.add("win-box");
  });
}

// ----------------------------
// TIE CHECK
// ----------------------------
function checkTie() {
  const full = [...boxes].every(box => box.innerText !== "");

  if (full) {
    msg.innerText = "🤝 Match Tied! No One Wins.";
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
  }
}

// ----------------------------
// UI UPDATE FUNCTIONS
// ----------------------------
function showWinner(player) {
  msg.innerText = `🎉 Congratulations! Winner is ${player}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function disableBoxes() {
  boxes.forEach((box) => box.disabled = true);
  resetBtn.disabled = true;
}

// ----------------------------
// RESET GAME
// ----------------------------
function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("win-box");
  });

  msgContainer.classList.add("hide");
  resetBtn.disabled = false;

  isOTurn = Math.random() > 0.5; // new random start
  gameOver = false;
}
