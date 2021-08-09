// /* // comment box
// */ //

// /* // operational
// */ //

/* // approach
operate(operator, numA, numB)
switch(operator)
add
subtract
multiply
divide
update display
buttons
operators
add
subtract
multiply
divide
equals
other
numbers
decimal point
backspace
clear: wipe all data
note
current answer = numA
pressing numbers = numberString
calculating = parseFloat(numberString)
divide by zero = funny message
decimal point disabled after use

display: original is "0"
numbers
update display.innerText with numbers
operators
first press: update display.innerText
second press: 
if no operator, change to recently pressed operator
activates equal sign and update display.innerText
equal sign: takes display.innerText and evaluates numA..operator..numB
mechanics
decimal: update display.innerText and disable button
shift: toggles remove button -- delete / clear
remove: delete: delete last char / clear: reset display

-- idea 2 --
numbersMode: enter firstNumbers, update display-content
operatorsMode: store firstNumbers, display-memory firstNumbers + operator
numbersMode: enter secondNumbers, update display
operatorsMode: if (firstNumbers stored ) store secondNumbers, always activate = operator, display-content results, append non = operator
// */ //

// /* // diagnostic
const meta = {
  elems: {
    displayContent: document.getElementById("display-content"),
    memoryContent: document.getElementById("memory-content"),
    operators: {
      add: document.getElementById("add"),
      subtract: document.getElementById("subtract"),
      divide: document.getElementById("divide"),
      multiply: document.getElementById("multiply"),
      equals: document.getElementById("equals"),
    },
    mechanics: {
      decimal: document.getElementById("decimal"),
      shift: document.getElementById("shift"),
      remove: document.getElementById("remove"),
    },
    config: {
      shiftToggle: false,
      removeMode: { clear: "clear", delete: "delete" },
    },
  },
};
const methods = {
  resetDisplay() {
    elems.displayContent.innerText = meta.origin.displayValue;
  },
  updateDisplay(str) {
    elems.displayContent.innerText += str;
  },
  deleteLastChar(str) {
    return str.slice(0, -1);
  },
  operate(operator, numA, numB) {
    switch (operator) {
      case "add":
        return numA + numB;
        break;
      case "subtract":
        return numA - numB;
        break;
      case "multiply":
        return numA * numB;
        break;
      case "divide":
        return numA / numB;
        break;
      default:
        console.error("Operate(operator, numA, numB) invalid operator");
    }
  },
  evaluate(str) {
    const numbers = str.match(/[-+]?([0-9]*[.])?[0-9]+[e]?/gi);
    const operator = str.match(/[-+x/]/gi);
    return { operator: operator[0], numA: numbers[0], numB: numbers[1] };
  },
};

const enterNumbers = (num) => {
  updateDisplay(num.toString());
};

const enterOperator = (operator) => {
  const opList = meta.elems.operators;
  switch (operator) {
    case opList.add:
      break;
    case opList.subtract:
      break;
    case opList.divide:
      break;
    case opList.multiply:
      break;
    case opList.equals:
      break;
    default:
      console.error("operator not found");
  }
};

const enterMechanics = (mechanic) => {
  const mechList = meta.elems.mechanics;
  switch (mechanic) {
    case mechList.decimal:
      break;
    case mechList.shift:
      break;
    case mechList.remove:
      break;
    default:
      console.error("mechanic not found");
  }
};

// */ //
