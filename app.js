// Selecting elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]


// 1. Using Random function which Generates the values in between 0 & 1
let isOTurn = Math.random() >= 0.5; // >= 0.5 means O turn else X turn

// 2. Using Random + Floor to select largest value 
isOTurn = Math.floor(Math.random() * 2) == 0 ? true : false; // true = O, false = X

// 3. Using an array
isOTurn = ["O", "X"] [Math.floor(Math.random() * 2)] === "O";

// 4. Using Boolean()
isOTurn = Boolean(Math.round(Math.random()));

// -------------------------------
// Event Listeners
// -------------------------------

boxes.forEach((box) => {
    box.addEventListener("click", () => handleBoxClick(box));
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// ----------------- MAIN FUNCTIONS -----------------

function handleBoxClick(box) 
{
  box.innerText = isOTurn ? "O" : "X";
  box.style.color = isOTurn ? "green" : "red";
  box.disabled = true;

  isOTurn = !isOTurn;

  if (checkWinner()) return;
  checkTie();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return true;
    }
  }
  return false;
}

function checkTie() {
  const isTie = [...boxes].every(box => box.innerText !== "");

  if (isTie) {
    msg.innerText = "Match Tied — No One Wins!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetBtn.style.display = "none";
  }
}


// -------------------------------
// UI Update Functions
// -------------------------------

function showWinner(player) 
{
  msg.innerText = `🎉 Congratulations!!! Winner is ${player}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  resetBtn.style.display = "none";
}

function disableBoxes() 
{
  boxes.forEach(box => box.disabled = true);
  resetBtn.disabled = true;
}

function resetGame() {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });

  isOTurn = true;

  msgContainer.classList.add("hide");
  resetBtn.style.display = "";
  resetBtn.disabled = false;
}