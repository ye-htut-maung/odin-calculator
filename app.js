let previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
let currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const numberButtons = Array.from(document.querySelectorAll("[data-number]"));
const operatorButtons = Array.from(
  document.querySelectorAll("[data-operator]")
);
const equalButton = document.querySelector("[data-equal]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");

let currentOperation = null;
let firstOperand = "";
let secondOperand = "";
let equalSignal = false;
// -----------------------

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    equalSignal = false;
    appendNumber(number.textContent);
  });
});

allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deleteNumber);
equalButton.addEventListener("click", () => {
  if (firstOperand == "") return;
  if (equalSignal === true) return;
  evaluate();
  equalSignal = true;
});

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    equalSignal = false;
    setOperation(operator.textContent);
  });
});

window.addEventListener("keydown", keyboardAction);

function keyboardAction(e) {
  equalSignal = false;
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  else if (e.key === ".") appendPoint(e.key);
  else if (e.key === "Backspace") deleteNumber();
  else if (e.key === "Escape") allClear();
  else if (e.key === "Enter") evaluate();
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setOperation(convertOperator(e.key));
  } else return;
}

function convertOperator(operator) {
  if (operator === "*") return "×";
  else if (operator === "/") return "÷";
  else return operator;
}

function appendNumber(number) {
  if (number === ".") {
    appendPoint(number);
  } else if (number === "0") {
    appendZero(number);
  } else {
    if (currentOperandTextElement.textContent === "0") {
      currentOperandTextElement.textContent = "";
    }
    currentOperandTextElement.textContent += number;
  }
}

function appendPoint(point) {
  if (currentOperandTextElement.textContent.includes(".")) {
    return;
  } else {
    if (currentOperandTextElement.textContent === "") {
      currentOperandTextElement.textContent += "0.";
    } else {
      currentOperandTextElement.textContent += point;
    }
  }
}

function appendZero(zero) {
  if (currentOperandTextElement.textContent === zero) {
    return;
  } else {
    currentOperandTextElement.textContent += zero;
  }
}

function allClear() {
  currentOperandTextElement.textContent = "";
  previousOperandTextElement.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
  equalSignal = false;
}

function deleteNumber() {
  currentOperandTextElement.textContent =
    currentOperandTextElement.textContent.slice(0, -1);
}

function setOperation(operator) {
  if (currentOperandTextElement.textContent === "") {
    currentOperation = operator;
    previousOperandTextElement.textContent = `${firstOperand} ${currentOperation}`;
    return;
  }
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = currentOperandTextElement.textContent;
  currentOperation = operator;
  previousOperandTextElement.textContent = `${firstOperand} ${currentOperation}`;
  currentOperandTextElement.textContent = "";
}

function evaluate() {
  if (
    currentOperation === "÷" &&
    currentOperandTextElement.textContent === "0"
  ) {
    alert("You can't divide by zero");
    allClear();
    return;
  }
  secondOperand = currentOperandTextElement.textContent;
  currentOperandTextElement.textContent = roundNumber(
    operate(firstOperand, secondOperand, currentOperation)
  ).toString();

  previousOperandTextElement.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundNumber(number) {
  return Math.round(number * 10000) / 10000;
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
  }
}
