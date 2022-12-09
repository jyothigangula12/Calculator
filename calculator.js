const display1 = document.querySelector(".display-top");
const display2 = document.querySelector(".display-bottom");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let display1Num = "";
let display2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`button[data-key='${e.key}']`);
  key.click();
});
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    display2Num += e.target.innerText;
    display2.innerText = display2Num;
  });
});
operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!display2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (display1Num && display2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(display2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});
function clearVar(opearation = "") {
  display1Num += display2Num + " " + opearation + " ";
  display1.innerText = display1Num;
  display2.innerText = "";
  display2Num = "";
  tempResult.innerText = result;
}
function mathOperation() {
  switch (lastOperation) {
    case "x":
      result = parseFloat(result) * parseFloat(display2Num);
      break;
    case "+":
      result = parseFloat(result) + parseFloat(display2Num);
      break;
    case "-":
      result = parseFloat(result) - parseFloat(display2Num);
      break;
    case "/":
      if (parseFloat(display2Num) !== 0) {
        result = parseFloat(result) / parseFloat(display2Num);
      } else result = "Error";
      break;
    case "%":
      result = parseFloat(result) % parseFloat(display2Num);
      break;
  }
}
equal.addEventListener("click", () => {
  if (!display2Num || !display1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2.innerText = result;
  tempResult.innerText = "";
  display2Num = result;
  display1Num = "";
});
clearAll.addEventListener("click", () => {
  display1Num = "";
  display2Num = "";
  display1.innerText = "";
  display2.innerText = "";
  result = "";
  tempResult.innerText = "";
});
clearLast.addEventListener("click", () => {
  display2Num = Math.floor(display2Num / 10);
  display2.innerText = display2Num;
});
