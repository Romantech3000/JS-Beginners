
// get random numbers for test purposes
function getRandomInt( min, max ) {
    return min + Math.floor( (max - min + 1) * Math.random() ) ;
}

// self-explanatory
function isPrime( num ) {
    if (num < 2) return false;

    for (var i = 2; i < num; i++) {
        
        if (num % i == 0) {
            console.log (num % i);
            return false;
        }
    }

    return true;
}

// С помощью цикла while вывести все простые числа в промежутке от 0 до 100
function task1() {
  var res = document.getElementById('results1');
  var i = 0;
    
    res.innerHTML = '';

    while (i <= 100) {
        if ( isPrime(i) ) res.innerHTML +=  '<span class="num-circ">' + i + '</span>&nbsp;';
        i++;
    }
}



// some unfinished code on how to actually add products to a shopcart
var addProdButtons = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < addProdButtons.length; i++) {
    var btn = addProdButtons[i];
    btn.addEventListener('click', function (event) {
        console.log(event.target.id);
    })
}

/*
Корзина товаров
*/
var basketProds = [
    {id:1, name:'apple', price:5.99, quantity: 5},
    {id:2, name:'pear', price:6.99, quantity: 2},
    {id:3, name:'peach', price:6.99, quantity: 3},
];

// shop cart total price
function countBasketPrice(goods) {
    var total = 0;
    for (var i = 0; i < goods.length; i++) {
        if (goods[i]) {
            if ( goods[i].price && goods[i].quantity ) total += goods[i].price*goods[i].quantity;
        };
    }
    return total;
}


function task2() {
    var prodList = '';
    for (var i = 0; i < basketProds.length; i++) prodList += basketProds[i].name + ' : ' + basketProds[i].quantity + '\n';
    alert( 'Товары: \n' + prodList +'Стоимость товаров в корзине: ' + countBasketPrice(basketProds) );
}


/*
 Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла
*/
function task4() {
    var res = document.getElementById('results4');
    res.innerHTML = '';
    for (var i = 0; i <= 9; console.log(i), res.innerHTML += '<span class="num-circ">' + i++ + '</span> ') {}
}


 /*
  С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
 */
function task5() {
  var xString = '';
    for (var i = 1; i<21; i++) {
        xString += 'x';
        console.log (xString);
    }
}