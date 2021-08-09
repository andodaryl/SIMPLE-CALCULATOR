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
numbersMode: enter numbers, update display-content
operatorsMode: store firstNumbers, display-memory firstNumbers + operator
numbersMode: enter numbers, update display-content
operatorsMode: if (firstNumbers stored) store secondNumbers, always activate = operator, display-content results, append non = operator
// */ //

// /* // diagnostic 1
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
    numbers: document.getElementsByClassName("number"),
  },
  class: {
    disable: "disable",
  },
  data: {
    firstNumber: 0,
    secondNumber: null,
    operator: null,
    placeholder: {
      displayContent: "0",
      memoryContent: "",
      firstNumber: 0,
      secondNumber: null,
    },
    config: {
      toggleShift: false,
      toggleDecimal: false,
      removeMode: { clear: "clear", delete: "delete" },
    },
  },
};
const methods = {
  resetDisplay() {
    const displayContent = meta.elems.displayContent;
    const placeholder = meta.data.placeholder;
    displayContent.innerText = placeholder.displayContent;
  },
  updateDisplay(str) {
    const displayContent = meta.elems.displayContent;
    const placeholder = meta.data.placeholder.displayContent;
    if (displayContent.innerText == placeholder) {
      // console.log("reseting display if display is placeholder");
      // console.log("placeholder: " + placeholder);
      // console.log("innerText: " + displayContent.innerText);
      str == "."
        ? (displayContent.innerText += str)
        : (displayContent.innerText = str);
    } else {
      // console.log("adding to display");
      displayContent.innerText += str;
    }
  },
  resetMemory() {
    const memoryContent = meta.elems.memoryContent;
    const placeholder = meta.data.placeholder;
    memoryContent.innerText = placeholder.memoryContent;
  },
  updateMemory() {
    const memoryContent = meta.elems.memoryContent;
    const firstNumber = meta.data.firstNumber.toString();
    const getOperator = () =>
      meta.data.operator == "=" ? "" : meta.data.operator.toString();
    const getSecondNumber = () =>
      meta.data.secondNumber ? meta.data.secondNumber.toString() : "";
    memoryContent.innerText =
      firstNumber + " " + getOperator() + " " + getSecondNumber();
  },
  updateData() {
    const displayContent = meta.elems.displayContent;
    meta.data.firstNumber
      ? (meta.data.secondNumber = displayContent.innerText)
      : (meta.data.firstNumber = displayContent.innerText);
  },
  resetData() {
    meta.data.firstNumber = meta.data.placeholder.firstNumber;
    meta.data.secondNumber = meta.data.placeholder.secondNumber;
    meta.data.operator = meta.data.placeholder.operator;
  },
  disableElement(element) {
    element.classList.add(meta.class.disable);
  },
  enableElement(element) {
    element.classList.remove(meta.class.disable);
  },
  storeNumbers(num) {},
  operate(operator, numA, numB) {
    numA = parseFloat(numA);
    numB = parseFloat(numB);
    switch (operator) {
      case "+":
        return numA + numB;
        break;
      case "-":
        return numA - numB;
        break;
      case "x":
        return numA * numB;
        break;
      case "/":
        return numA / numB;
        break;
      default:
        console.error("Operate(operator, numA, numB) invalid operator");
    }
  },
};
methods.deleteLastChar = () => {
  const displayContent = meta.elems.displayContent;
  const textLength = displayContent.innerText.length;
  textLength > 1
    ? (displayContent.innerText = displayContent.innerText.slice(0, -1))
    : methods.resetDisplay();
};
methods.resetAll = () => {
  methods.resetDisplay();
  methods.resetMemory();
  methods.resetData();
};
methods.enterNumber = (num) => {
  methods.updateDisplay(num.toString());
};

methods.toggleShift = () => {
  const mechList = meta.elems.mechanics;
  const config = meta.data.config;
  // console.log("mechanic shift activated!");
  // console.log(config.toggleShift);
  if (config.toggleShift == true) {
    mechList.remove.classList.remove(config.removeMode.clear);
    mechList.remove.classList.add(config.removeMode.delete);
    config.toggleShift = false;
  } else {
    mechList.remove.classList.remove(config.removeMode.delete);
    mechList.remove.classList.add(config.removeMode.clear);
    config.toggleShift = true;
  }
};

const enterOperator = (operator) => {
  const displayContent = meta.elems.displayContent;
  const opList = meta.elems.operators;
  const updateOperator = () => {
    switch (operator) {
      case opList.add:
        meta.data.operator = "+";
        break;
      case opList.subtract:
        meta.data.operator = "-";
        break;
      case opList.divide:
        meta.data.operator = "/";
        break;
      case opList.multiply:
        meta.data.operator = "x";
        break;
      case opList.equals:
        meta.data.operator = "=";
        break;
      default:
        console.error("operator not found");
    }
  };
  if (operator != opList.equals) {
    if (meta.data.firstNumber) {
      console.log("firstNumber exists!");
      console.log("operator: " + meta.data.operator);
      console.log("firstNumber: " + meta.data.firstNumber);
      if (displayContent.innerText == meta.data.placeholder.displayContent) {
        updateOperator();
        methods.updateMemory();
      } else {
        methods.updateData();
        const answer = methods.operate(
          meta.data.operator,
          meta.data.firstNumber,
          meta.data.secondNumber
        );
        // console.log("result: " + result.toString());
        methods.resetAll();
        methods.updateDisplay(answer.toString());
        methods.updateData();
        updateOperator();
        methods.updateMemory();
        methods.resetDisplay();
      }
    } else {
      updateOperator();
      methods.updateData();
      methods.updateMemory();
      methods.resetDisplay();
    }
  }
  if (operator == opList.equals && meta.data.firstNumber) {
    if (displayContent.innerText != meta.data.placeholder.displayContent) {
      methods.updateData();
      const answer = methods.operate(
        meta.data.operator,
        meta.data.firstNumber,
        meta.data.secondNumber
      );
      // console.log("result: " + result.toString());
      methods.resetAll();
      updateOperator();
      methods.updateDisplay(answer.toString());
    }
  }
};

const enterMechanic = (mechanic) => {
  const displayContent = meta.elems.displayContent;
  const mechList = meta.elems.mechanics;
  const config = meta.data.config;
  switch (mechanic) {
    case mechList.decimal:
      // console.log("mechanic decimal detected!");
      // console.log(config.toggleDecimal);
      config.toggleDecimal = /[.]/g.test(displayContent.innerText);
      if (config.toggleDecimal == false) {
        // console.log("mechanic decimal activated!");
        config.toggleDecimal = true;
        methods.disableElement(mechList.decimal);
        methods.updateDisplay(".");
      }
      break;
    case mechList.shift:
      methods.toggleShift();
      break;
    case mechList.remove:
      // console.log("mechanic remove activated!");
      if (config.toggleShift) {
        methods.resetAll();
        methods.toggleShift();
      } else {
        methods.deleteLastChar();
      }
      break;
    default:
      console.error("mechanic not found");
  }
};

for (let i = 0; i < meta.elems.numbers.length; i++) {
  const numberButton = meta.elems.numbers[i];
  numberButton.addEventListener("click", (detected) => {
    if (detected) {
      const numberValue = numberButton.getAttribute("id");
      methods.enterNumber(numberValue);
    }
  });
}
for (mechanicKey in meta.elems.mechanics) {
  const mechanic = meta.elems.mechanics[mechanicKey];
  mechanic.addEventListener("click", (detected) => {
    if (detected) {
      enterMechanic(mechanic);
    }
  });
}
for (opKey in meta.elems.operators) {
  const operator = meta.elems.operators[opKey];
  operator.addEventListener("click", (detected) => {
    if (detected) {
      enterOperator(operator);
    }
  });
}

// */ //
