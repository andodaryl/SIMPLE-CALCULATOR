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
    secondNumber: 0,
    operator: null,
    placeholder: { displayContent: "0", memoryContent: "" },
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
    const memoryContent = meta.elems.memoryContent;
    const placeholder = meta.data.placeholder;
    displayContent.innerText = placeholder.displayContent;
    memoryContent.innerText = placeholder.memoryContent;
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
  disableElement(element) {
    element.classList.add(meta.class.disable);
  },
  enableElement(element) {
    element.classList.remove(meta.class.disable);
  },
  storeNumbers(num) {},
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
methods.deleteLastChar = () => {
  const displayContent = meta.elems.displayContent;
  const textLength = displayContent.innerText.length;
  textLength > 1
    ? (displayContent.innerText = displayContent.innerText.slice(0, -1))
    : methods.resetDisplay();
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

const enterNumber = (num) => {
  methods.updateDisplay(num.toString());
};

for (let i = 0; i < meta.elems.numbers.length; i++) {
  const numberButton = meta.elems.numbers[i];
  numberButton.addEventListener("click", (detected) => {
    if (detected) {
      const numberValue = numberButton.getAttribute("id");
      enterNumber(numberValue);
    }
  });
}

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
        console.log("mechanic decimal activated!");
        config.toggleDecimal = true;
        methods.disableElement(mechList.decimal);
        methods.updateDisplay(".");
      }
      break;
    case mechList.shift:
      methods.toggleShift();
      break;
    case mechList.remove:
      console.log("mechanic remove activated!");
      if (config.toggleShift) {
        methods.resetDisplay();
        methods.toggleShift();
      } else {
        methods.deleteLastChar();
      }
      break;
    default:
      console.error("mechanic not found");
  }
};

for (mechanicKey in meta.elems.mechanics) {
  const mechanic = meta.elems.mechanics[mechanicKey];
  mechanic.addEventListener("click", (detected) => {
    if (detected) {
      enterMechanic(mechanic);
    }
  });
}

// */ //
