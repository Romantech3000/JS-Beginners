
// get random numbers for test purposes
function getRandomInt( min, max ) {
    return min + Math.floor( (max - min + 1) * Math.random() ) ;
}

// integer divisions

// integer division with rounding //~~ would be faster
function intDivFloorCeil (dividend, divisor) {
    return (dividend/divisor >= 0) ? Math.floor(dividend/divisor) : Math.ceil(dividend/divisor);
}

// to string and back to number. might not work for scientific notation
function intDivParse (dividend, divisor) {
    return parseInt(dividend/divisor, 10);
}

// integer division by argument reduction
function intDivRed (dividend, divisor) {
    return (dividend - dividend % divisor) / divisor;
}

// also (dividend/divisor|0) and (dividend/divisor>>0) (32 bit)
// trunc ECMAS 2015 doesn't work in IE

// since some functions can return an empty object, might as well need to check for it
function isEmptyObj(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

// написать функцию, преобразующую число в объект
// converts a number into an object using integer division approach
// (?) returning an empty object seems like not the best idea, since it's harder to check for than, say, null 
// simple, works with floats and negatives
function numToObject(num) {
  var obj = {};
    if (isNaN(num)) {
        console.log(num + ' не является числом');
        return {};
    }

    if (num < 0 || num > 999) {
        console.log(' число должно быть в диапазоне 0..999');
        return {}; // 
    }

    // 'по-русски свойства писать не очень хорошо' (с) Лекция
    obj['hundreds'] = ~~(num / 100);
    obj['tens']     = ~~(num % 100 / 10);
    obj['units']    = ~~(num % 10);

    return obj;
}

// put a random number into the input field, so a user doesn't have to
function task1RandomNum () {
  var numBox = document.getElementById('number1');
  numBox.value = getRandomInt(0, 999);
}

// Задание 1 Основная вызывающая функция
function task1() {
  var numToParse = document.getElementById('number1').value; // not converting to an integer for test purposes 
  //  var num2parse = +prompt('Введите число от 0 до 999');
    console.log('Начальное значение: ' + numToParse + '\nИтоговый объект: ');
    console.log(numToObject(numToParse));
    alert('Начальное значение: ' + numToParse 
        + '\nИтоговый объект: ' + JSON.stringify(numToObject(numToParse)) ); //ECMAS 5.1+
}



// some unfinished code on how to actually add products to a shopcart
var addProdButtons = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < addProdButtons.length; i++) {
    var btn = addProdButtons[i];
    btn.addEventListener('click', function (event) {
        //console.log(event.target.id);
        var count = Number(localStorage.getItem(event.target.id));
        if (count == null) {
            localStorage.setItem(event.target.id, 1);
        }
        else {
            localStorage.setItem(event.target.id, ++count);            
        }
        showCartTotal();
        console.log(localStorage);
    });
}

var btnRemoveFromCart = document.getElementsByClassName('cart-remove-button');

for (i = 0; i < btnRemoveFromCart.length; i++) {
    var btn = btnRemoveFromCart[i];

    btn.addEventListener('click', function (event) {
        var btnClicked = event.target;
        var count = Number(localStorage.getItem(event.target.id));
        
        btnClicked.parentElement.parentElement.remove();
        showCartTotal();
        console.log(localStorage);
    });

}

function showCartTotal () {

}


/*
Корзина товаров

В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими
объектами можно заменить их элементы?
b. Реализуйте такие объекты.
c. Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/
var cartProds = [
    {id:1, name:'apple', price:5.99, quantity: 5},
    {id:2, name:'pear', price:6.99, quantity: 2},
    {id:3, name:'peach', price:6.99, quantity: 3},
];


var shopCart = {
    products: [],

    getTotalPrice: function () { // shopping cart total price
        var total = 0;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]) {
                if ( this.products[i].price && this.products[i].quantity ) 
                            total += this.products[i].price*this.products[i].quantity;
            };
        }
        return total;
    },

    addProduct: function (product, numPieces) { // only for adding 1 product.
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === product.id) {
                this.products[i].quantity += numPieces;
                return;
            }
        }
        var idx = this.products.length;
        this.products[idx] = {};
        this.products[idx].id = product.id;
        this.products[idx].name = product.name;
        this.products[idx].price = product.price;
        this.products[idx].quantity = numPieces;
    }
}


function task2() {
    for (var i = 0; i < cartProds.length; i++) {
        shopCart.addProduct(cartProds[i], cartProds[i].quantity);
    }
    alert( 'Товары: \n' + JSON.stringify(shopCart.products, ' ', 4)+'\nСтоимость товаров в корзине: ' + shopCart.getTotalPrice() );
}


//
//  products data (frontend)
//

// properties of products
var productProperty = {
    name: '',
    type: '',
    value: ''
};

// options (unlike properties those affect the proce)
// for 'complex' products
var productOption = {
    name:  '',  //color, size, finish, etc.
    price: '' //how much does the option adds to the base price
}

// product constructor. just to show a possible object properties
function Product(id, code, name, shortdescr, longdescr, manufacturer, 
        instock, price, properties, origin, ean13, weight, discount) {
    this.id = id; // id in the database
    this.code = code; // manufacturer code
    this.ean13 = ean13;
    this.name = name; // string
    this.shortdescr = shortdescr; // string
    this.longdescr = longdescr; // string
    for (var i = 0; i < categories.length; i++) {
        this.categories[i] = categories[i]; // array of category id's
    }
    this.manufacturer = manufacturer;
    this.instock = instock;
    this.price = price;

    // copy properties. maybe an array of propery id's would be better than the whole set of values
    for (var i = 0; i< properties.length; i++) {  
        this.properties[i].name = properties[i].name;
        this.properties[i].type = properties[i].type;
        this.properties[i].value = properties[i].value;
    }

    this.origin = origin;
    this.weight = weight;
    this.discount = discount;
}