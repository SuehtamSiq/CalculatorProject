const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let opeator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",")
}

function addDigit(digit) {
    if (digit == "," && (currentNumber.includes(",") || currentNumber))
        return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    }
    else {
        currentNumber += digit;
    }
    updateResult();
    }

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        }
    });
})

