class Calulator { // x + y, NOTE IN THIS CODE previousOperand is x and currentOperand is y
    constructor(prevOperand, currOperand) {
        this.previousOperandElement = prevOperand;
        this.currentOperandElement = currOperand; // set these elements in our class
        this.clear(); // set to default values upon load
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.opeartion = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); // chops off the last element
    }

    appendNumber(number) { // happens when a user clicks a number and it gets added to the screen

        if(number === '.' && this.currentOperand.includes('.')) return; // we dont wanna add multiple decimals like 256...

        // we convert to a string to avoid numbers being add. we want it to be appended to the end instead.
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
    }

    chooseOperation(opeartion) { // happens when a user clicks on an operation
        if(this.currentOperand === '') return; // we want to make sure there a number there to perform operation on
        if(this.previousOperand !== '') {
            // if we already have a previous value, do that computation before adding another operation
            // if the user does 55 + 55 + , we want to excute the first 55 +55 
            this.compute(); 
        }
        this.opeartion = opeartion;
        this.previousOperand = this.currentOperand; // since the user going to select new numbers now, done typing current number
        this.currentOperand = '';

    }

    compute() {
        let result; 
        let currentOperand = parseFloat(this.currentOperand);
        let previousOperand = parseFloat(this.previousOperand);
        // if the user only has one opearnd like 22 + and presses equal we dont want this to run
        if(isNaN(this.previousOperand) || isNaN(this.currentOperand)) return; //isNaN checks if the value is there and is a number

        switch(this.opeartion) { // like a bunch of if statements on a single object
            case '+':
                result = previousOperand + currentOperand;
                break;
            case '-':
                result = previousOperand - currentOperand;
                break;
            case '*':
                result = previousOperand * currentOperand;
                break;
            case '÷':
                result = previousOperand / currentOperand;
                break;
            default: return;
        }

        this.currentOperand = result;
        this.opeartion = ''; // reset
        this.previousOperand = '';// reset

    }

    updateDisplay() { // updated value inside the output screen
        this.currentOperandElement.innerText = this.currentOperand; // set the value to the current button clicked
        this.previousOperandElement.innerText = '';
        if(this.opeartion !== null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.opeartion}` // this combines the two strings, so the previous operation shows 22 + instead of just 22
        }
        
    }
}



// use data-operation attribute to identify data operation buttons such as + - / *
// use data-number attribute to identify data numbers buttons such as 1 2 3 4

const numberBtns = document.querySelectorAll('[data-number]'); // inside a [] because its referring to an attribute name
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calulator(previousOperandElement, currentOperandElement);
//get the buttons and add an event listener to it

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        // do somethin on the click
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        // do somethin on the click
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalBtn.addEventListener('click', () => {
        // do somethin on the click
        calculator.compute();
        calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    // do somethin on the click
    calculator.delete();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', () => {
    // do somethin on the click
    calculator.clear();
    calculator.updateDisplay();
});