/*
Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму 
*/
function task3() {
  var a = Math.floor( -100 + Math.floor( 201 * Math.random() ) );
  var b = Math.floor( -100 + Math.floor( 201 * Math.random() ) );
  var res = document.getElementById('results3');
                   

    if (res == null) {
        alert ('Ошибка. Не найден элемент results3');
        return;
    }
    
    res.innerHTML = 'a = ' + a + '; b = ' + b + '<br>';

    if (a >= 0 && b >= 0) {  // "Ноль можно считать положительным числом."
        res.innerHTML += 'разность a и b: ' + (a - b); 
    }
    else if (a < 0 && b < 0) {  // a и b отрицательные
            res.innerHTML += 'произведение a и b: ' + (a * b);
        }
        else res.innerHTML += 'сумма a и b: ' + (a + b);
    
}

/*
Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/
function task4() {
  var a = Math.floor( 16 * Math.random() );
  var res = document.getElementById('results4');
  var tmpStr = '';
    
    if (res == null) {
        alert ('Ошибка. Не найден элемент results4');
        return;
    }
    
    tmpStr = 'a = ' + a + '<br>';
    switch (a) {
        case 0:  tmpStr += 0 + '&nbsp;';
        case 1:  tmpStr += 1 + '&nbsp;';
        case 2:  tmpStr += 2 + '&nbsp;';
        case 3:  tmpStr += 3 + '&nbsp;';
        case 4:  tmpStr += 4 + '&nbsp;';
        case 5:  tmpStr += 5 + '&nbsp;';
        case 6:  tmpStr += 6 + '&nbsp;';
        case 7:  tmpStr += 7 + '&nbsp;';
        case 8:  tmpStr += 8 + '&nbsp;';
        case 9:  tmpStr += 9 + '&nbsp;';
        case 10: tmpStr += 10 + '&nbsp;';
        case 11: tmpStr += 11 + '&nbsp;';
        case 12: tmpStr += 12 + '&nbsp;';
        case 13: tmpStr += 13 + '&nbsp;';
        case 14: tmpStr += 14 + '&nbsp;';
        case 15: tmpStr += 15 + '&nbsp;';
        break;
        default:
            tmpStr = 'Ошибочное значение';
    }
    res.innerHTML = tmpStr;
}

/*
Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;    
}

function divide(a, b) {
    return a / b;
}

function calcAB() {
  var a = Number(document.getElementById('value_a').value);
  var b = Number(document.getElementById('value_b').value);
  var oper = document.getElementById('oper').value;
  var resElem = document.getElementById('result');
  var res;
    switch (oper) {
        case '+':
            res = add(a, b);
        break;
        case '-':
            res = subtract(a, b);
        break;
        case '*':
            res = multiply(a, b);
        break;
        case '/':
            res = divide(a, b);
        break;
        default :
            res = NaN;
    }

    if (isNaN(res)) resElem.value = 'Ошибка';
    else resElem.value = res;
}

/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 3) и вернуть полученное значение (применить switch).
*/

function task6() {
    var a = prompt('Введите аргумент 1');
    var b = prompt('Введите аргумент 2');
    var oper = prompt('Введите оператор (+,-,*,/)');
    var res = mathOperation(a, b, oper);
    if ( !isNaN(res) ) alert ('Результат вычисления: ' + res);
}

function mathOperation(arg1, arg2, operation) {

    if (isNaN(arg1) || isNaN(arg2)) return NaN;

    switch (operation) {
        case '+':
            return add(arg1, arg2);
        break;
        case '-':
            return subtract(arg1, arg2);
        break;
        case '*':
            return multiply(arg1, arg2);
        break;
        case '/':
            return divide(arg1, arg2);
        break;
        default :
            return NaN;
    }    
}
/*
* Сравнить null и 0. Объяснить результат.
 */
function task7() {
    var taskText = document.getElementById('task7');
    if (taskText) {
        taskText.innerHTML = '<b>null == 0 ?<br>'+(null==0) + '</b> (Object, Number. ToPrimitive(null), 0. return false на последнем шаге алгоритма)<br>'
        + '<b>null > 0 ?<br>'+(null>0) + '</b> (Абстрактный алгоритм сравнения для отношений\nToPrimitive: null, 0; ToNumber: 0, 0; 0 > 0? false . То же для оператора <)<br>'
        + '<b>null >= 0 ?<br>'+(null>=0) + '</b> (проверяет null<0? false потому return true)<br>'
        + '<b>null <= 0 ?<br>'+(null<=0) + '</b> проверяет null>0? false return true)<br>'
        + '<b>null === 0 ?<br>'+(null===0) + '</b> (разные типы Object и Number)<br>';
    }
    else alert(
          'null == 0 ?\n'+(null==0) + ' (Object, Number. ToPrimitive(null), 0. return false на последнем шаге алгоритма)\n'
        + 'null > 0 ?\n'+(null>0) + ' (Абстрактный алгоритм сравнения для отношений\nToPrimitive: null, 0; ToNumber: 0, 0; 0 > 0? false . То же для оператора <)\n'
        + 'null >= 0 ?\n'+(null>=0) + ' (проверяет null<0? false потому return true)\n'
        + 'null <= 0 ?\n'+(null<=0) + ' проверяет null>0? false return true)\n'
        + 'null === 0 ?\n'+(null===0) + ' (разные типы Object и Number)\n'
    );
}

 /*
  С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
 */
function power(val, pow) {
    if (pow==0) return 1;
    if (pow==1) return val;
    return val*power(val, pow-1);
}

function task8() {
    var a = Number( prompt('Введите основание степени (целое положительное число)', 1) );
    var b = Number( prompt('Введите показатель степени (целое положительное число)', 1) );
    if ( isNaN(a) || isNaN(b) || a < 1 || b < 1 || Math.floor(a)!=a || Math.floor(b)!=b ) {
        alert ('Ошибочные параметры');
    }
    else alert ('Результат: ' + power(a, b));
}