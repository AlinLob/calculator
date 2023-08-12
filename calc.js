let currentValue = '';
let currentOperation = '';
let previousValue = '';
let resultDisplayed = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷'];

const out = document.querySelector('.calc-screen p')

const clearAll = () => {
    currentValue = previousValue = currentOperation = '';
    resultDisplayed = false;
    out.textContent = '0';
}

const handleDigit = key => {
    if (resultDisplayed) currentValue = '';
    currentValue += key;
    out.textContent = currentValue;
}

const handleAction = key => {
    if (currentValue) {
        if (currentOperation) handleEquals();
        previousValue = currentValue;
        currentValue = '';
        currentOperation = key;
    }
}

const handlePercent = () => {
    if (currentValue) {
        currentValue = (+currentValue / 100).toString();
        out.textContent = currentValue;
    }
}

const handlePlusMinus = () => {
    if (currentValue) {
        currentValue = (-currentValue).toString();
        out.textContent = currentValue;
    }
}

const handleEquals = () => {
    if (previousValue && currentValue && currentOperation) {
        const a = parseFloat(previousValue);
        const b = parseFloat(currentValue);
        switch (currentOperation) {
            case '+': currentValue = (a + b).toString(); break;
            case '-': currentValue = (a - b).toString(); break;
            case '×': currentValue = (a * b).toString(); break;
            case '÷': currentValue = (b !== 0 ? (a / b).toString() : '∞'); break;
        }
        resultDisplayed = true;
        out.textContent = currentValue;
    }
    currentOperation = '';
}

document.querySelector('.ac').addEventListener('click', clearAll);

document.querySelector('.buttons').addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('btn')) return;

    const key = target.textContent;

    if (digit.includes(key)) handleDigit(key);
    if (action.includes(key)) handleAction(key);
    if (key === '%') handlePercent();
    if (key === '+/-') handlePlusMinus();
    if (key === '=') handleEquals();
});