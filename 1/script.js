/* Calculadora */

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Limpa tudo ao iniciar
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
    if (this.currentOperand === 'Erro') this.currentOperand = '0';
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') this.currentOperand = '';
    this.currentOperand = this.currentOperand.toString() + number.toString();
    }

        chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': computation = prev * current; break;
            case '÷': computation = prev / current;
            if (current === 0) {
                this.currentOperand = 'Impossível dividir por 0';
                this.operation = undefined;
                this.previousOperand = '';
                return;
            } else {
                computation = prev / current;
            }
            break;
                default: return;
            }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand
            ? `${this.previousOperand} ${this.operation || ''}`
            : '';
    }

    deleteOperation() {
    // Só faz algo se houver uma operação selecionada
    if (this.operation === undefined) return;

    // Traz o número anterior de volta pra tela principal
    this.currentOperand = this.previousOperand;

    // Limpa o operador e o número anterior
    this.operation = undefined;
    this.previousOperand = '';
    }
}  

    // Seleciona todos os botões
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
// ... e assim por diante para todos os botões

// Cria a calculadora
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Adiciona os eventos
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// ... e assim por diante para os outros botões

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  if (calculator.operation && calculator.currentOperand === '0') {
    calculator.deleteOperation(); // apaga o operador se ainda não começou a digitar o segundo número
  } else {
    calculator.delete(); // apaga número normalmente
  }
  calculator.updateDisplay();
});

