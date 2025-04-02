const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;
let clearMode = "C"; // Controla se o botão deve ser C ou apagar último número

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
    document.querySelector(".bg-grey").innerText = clearMode; // Atualiza botão
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || currentNumber === ""))
        return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }
    clearMode = "⌫"; // Altera o botão para apagar último número
    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operator = newOperator;
}

function calculate() {
    if (operator == null || firstOperand == null)
        return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    clearMode = "C"; // Volta ao modo de limpar tudo
    updateResult();
}

function clearCalculator() {
    if (clearMode === "C") {
        currentNumber = "";
        firstOperand = null;
        operator = null;
    } else {
        currentNumber = currentNumber.slice(0, -1); // Remove apenas um número
        if (!currentNumber) {
            clearMode = "C";
            currentNumber = "";
        }
    }
    updateResult();
}

function setPercentage() {
    let result = parseFloat(currentNumber.replace(",", ".")) / 100;
    if (["+", "-", "x", "÷"].includes(operator)) {
        result *= firstOperand || 1;
    }
    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString();
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C" || buttonText === "⌫") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult();
        } else if (buttonText === "%") {
            setPercentage();
        }
    });
});
