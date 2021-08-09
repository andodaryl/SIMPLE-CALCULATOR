// /* // comment box
// */ //

// /* // operational
// */ //

// /* // diagnostic
const meta = {
  origin: { displayValue: 0 },
  elems: {
    displayContent: document.getElementById("display-content"),
  },
};
const methods = {
  resetDisplay() {
    elems.displayContent.innerText = meta.origin.displayValue;
  },
  updateDisplay(str) {
    elems.displayContent.innerText += str;
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
// */ //
