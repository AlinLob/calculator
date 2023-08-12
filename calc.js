let a = ''; //first number
let b = ''; //second number
let sign = ''; //знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷'];

//экран
const out = document.querySelector('.calc-screen p')

const clearAll = () => {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // Нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // Нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) {
        clearAll();
        return;
    }

    // Получаем нажатую кнопку
    const key = event.target.textContent;

    // Если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        handleDigit(key);
    }

    // Если нажата клавиша + - / *
    if (action.includes(key)) {
        handleAction(key);
    }

    // Если нажата клавиша %
    if (key === '%') {
        handlePercent();
    }

    // Если нажата клавиша +/-
    if (key === '+/-') {
        handlePlusMinus();
    }

    // Если нажата клавиша =
    if (key === '=') {
        handleEquals();
    }
}

function handleDigit(key) {
    if (b === '' && sign === '') {
        a += key;
        out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
        b = key;
        finish = false;
        out.textContent = b;
    } else {
        b += key;
        out.textContent = b;
    }
    console.log(a, b, sign);
}

function handleAction(key) {
    sign = key;
    out.textContent = sign;
    console.log(a, b, sign);
}

function handlePercent() {
    if (b === '') {
        a = (+a) / 100;
        out.textContent = a;
    } else {
        b = (+b) / 100;
        out.textContent = b;
    }
}

function handlePlusMinus() {
    if (b === '') {
        a = (-a).toString();
        out.textContent = a;
    } else {
        b = (-b).toString();
        out.textContent = b;
    }
}

function handleEquals() {
    if (b === '') b = a;
    switch (sign) {
        case '+':
            a = (+a) + (+b);
            break;
        case '-':
            a = a - b;
            break;
        case '×':
            a = a * b;
            break;
        case '÷':
            if (b === '0') {
                out.textContent = '∞';
                clearAll();
                return;
            }
            a = a / b;
            break;
    }
    finish = true;
    out.textContent = a;
}