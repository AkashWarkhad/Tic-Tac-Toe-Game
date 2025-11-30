let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let turnO = true //PlayerX & PlayerO

boxes.forEach((box) => {
    box.addEventListener("click", ()=> {
        console.log("Box clicked!!");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        CheckWinner();
        PrintNoOneWin();
    })
})

const CheckWinner = () => {
    winPattern.forEach((pat) => {
        let pos1 = boxes[pat[0]].innerText;
        let pos2 = boxes[pat[1]].innerText;
        let pos3 = boxes[pat[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2 && pos2 === pos3)
            {
                ShowWinner(pos1);
            }
        }
    })
}

const ShowWinner = (winner) => 
{
    msg.innerText = `Congradulations!!! Winner is ${winner}.`;
    msgContainer.classList.remove("hide");
    DisableBoxes();
}

function PrintNoOneWin() 
{
    for(let box of boxes)
    {
        if(box.innerText === ""){ return; }
    }
    msg.innerText = `Match Tieup, No One Wins!!`
    msgContainer.classList.remove("hide");
    DisableBoxes();
}

const DisableBoxes = () => {
    for(let box in boxes)
    {
        box.disabled = true;
    }

    resetbtn.disabled = true;
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }

    msgContainer.classList.add("hide");
}

resetbtn.addEventListener("click", enableBoxes);
newGamebtn.addEventListener("click", enableBoxes);