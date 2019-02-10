var IMG_DIR = 'images/'; 

// 'dummy' product data. should fill the product data from a remote DB later
// quantity here is the quantity in stock. don't really need it atm
// shortdescr is ommited 
var shopProds = [
    {id:1, name:'Apple', short_descr: 'lorem ipsum', price:5.99, quantity: 5, unit: 'кг', image: 'apple01.jpg'},
    {id:2, name:'Pear', short_descr: 'lorem ipsum', price:6.99, quantity: 2, unit: 'кг', image: 'pear01.jpg'},
    {id:3, name:'Peach', short_descr: 'lorem ipsum', price:6.99, quantity: 3, unit: 'кг', image: 'peach01.jpg'},
    {id:4, name:'Plum', short_descr: 'lorem ipsum', price:4.99, quantity: 4, unit: 'кг', image: 'plum01.jpg'},
    {id:5, name:'Banana', short_descr: 'lorem ipsum', price:4.99, quantity: 4, unit: 'кг', image: 'banana01.jpg'},
    {id:6, name:'Pineapple', short_descr: 'lorem ipsum', price:7.99, quantity: 1, unit: 'шт', image: 'pineapple01.jpg'}
];

// =====================================
//         main shopcart object 
// =====================================
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
        // maybe it would be enough to store just product id's and get all data from shopProds instead of copying it
        var idx = this.products.length;
        this.products[idx] = {};
        this.products[idx].id = product.id;
        this.products[idx].name = product.name;
        this.products[idx].price = product.price;
        this.products[idx].quantity = numPieces;
        this.products[idx].image = product.image;
        this.products[idx].short_descr = product.short_descr;
    },

    delProductById: function (prodId) {
        var prodIdx;
        if (prodId < 0) {
            console.log('Invalid product Id');
            return;
        }
    
        prodIdx = getProdIndexById(this.products, prodId);
        if (prodIdx >= 0 && prodIdx < this.products.length) {
            for (var i = prodIdx; i < this.products.length-1; i++) {
                this.products[i] = this.products[i+1];
            }
            --this.products.length;
        }
        else {
            console.log('Can\'t find product ' + prodId);
        }
    },

    view: viewCart,

    clear: function () {
        this.products.length = 0;
    }
}


/*
 Сделать так, чтобы товары в каталоге выводились при помощи JS:
a. Создать массив товаров (сущность Product);
b. При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид
каталога генерируется JS.
*/

// ==================================================================
// Makes new product cards for the whole passed array of prodicts,
// and adds them to the passed Div as children
// ==================================================================
// ========================================================================================
//  inside this function addEventListener does work for dynamically created elements!
// ========================================================================================
function makeCatalog(products, divId) {
  var prodEl, prodTitleEl, prodImgEl, prodDetEl, prodPriceEl, toCartBtnEl, catWrapperEl;
    
    catWrapperEl = document.getElementById(divId);
    if (catWrapperEl === null) {
        throw 'Error: can\'t find the catalog wrapper element: ' + divId;
        return;
    }
    
    // creating catalog items for ell products (normally for a given range of db select results)
    for (var i = 0;  i < products.length; i++) {
        //console.log ('prod: ' + products[i].name);
        // shop catalog item main block
        prodEl = document.createElement('div');
        prodEl.classList.add('shop-item');
        // product title
            prodTitleEl = document.createElement('h3');
            prodTitleEl.classList.add('shop-item-title');
            prodTitleEl.textContent = products[i].name;
        prodEl.appendChild(prodTitleEl);
        // product image
            prodImgEl = document.createElement('img');
            prodImgEl.classList.add('shop-item-image')
            prodImgEl.alt = products[i].name;
            prodImgEl.src = IMG_DIR + products[i].image;
        prodEl.appendChild(prodImgEl);

        // product details
            prodDetEl = document.createElement('div');
            prodDetEl.classList.add('shop-item-details');
                prodPriceEl = document.createElement('span');
                prodPriceEl.classList.add('shop-item-price');
                prodPriceEl.innerHTML = products[i].price + ' руб./' + products[i].unit;
            prodDetEl.appendChild(prodPriceEl);

                toCartBtnEl = document.createElement('button');
                toCartBtnEl.classList.add('shop-item-button');
                toCartBtnEl.id = products[i].id;
            // quick fix to avoid repeating id's due to allowed multiple addition of the same products
            // which should never happen in real applications, since id's are always unique
            // should be enough for now delete the whole thing later
            if (document.getElementById(toCartBtnEl.id)) {
                toCartBtnEl.id += '-dub';
                if (document.getElementById(toCartBtnEl.id)) {
                    toCartBtnEl.id += '-dub';
                }
            }
//QUESTION PART 1/2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// this listener attachment works just fine!
                toCartBtnEl.addEventListener('click', addToCartClick);
                toCartBtnEl.innerHTML = 'В корзину';
            prodDetEl.appendChild(toCartBtnEl);
        prodEl.appendChild(prodDetEl);      

        catWrapperEl.appendChild(prodEl);
    }
    console.log('Catalog: ' + i + ' products added');
     //  <button id="prod1" class="shop-item-button">В корзину</button>
}


// ========================================================================
// when the target is clicked, identify the product and add it to shopCart
// ========================================================================
function addToCartClick(event) {
    var prodId = buttonIdToProdId(event.target.id);
    var prodIdx;
    
    if (prodId < 0) {
        console.log('Invalid product Id');
        return;
    }

    prodIdx = getProdIndexById(shopProds, prodId);
    if (prodIdx >= 0) {
        //console.log(event.target.id);
        shopCart.addProduct(shopProds[prodIdx], 1);
    }
    else {
        console.log('Can\'t find product ' + prodId);
    }
    shopCart.view('cart');
}

// calls makeCatalog with parameters
function makeCatalogParms() {
    makeCatalog(shopProds, 'catalog');
}

// converts button id to DB product Id.  just stripping the garbage off the Id
// (extra junk is added to avoid duplicate Id's in the DOM)
function buttonIdToProdId(btnId) {
    var idArr = btnId.split('-');
    var id = -1;
    if (idArr.length) {
        //console.log('Clicked button Id ' + btnId + ' Got product Id: ' + idArr[0]);
        return parseInt(idArr, 10);    
    }
    return -1;
}

// get the product index which id matches the passed prodId
// if no matching Id found, returns -1
function getProdIndexById(products, prodId) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === prodId) return i;
    }
    return -1;
}

/*
  Сделать генерацию корзины динамической: верстка корзины не должна находиться в
  HTML-структуре. Там должен быть только div, в который будет вставляться корзина,
  сгенерированная на базе JS:
  a. Пустая корзина должна выводить строку «Корзина пуста»;
  b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей»
*/
// ========================================================================================
//  inside this function addEventListener doesn't work for dynamically created elements
// ========================================================================================
// made it a method of shopCart object, hence 'this'
function viewCart(cartElId) {
    var cartEl, cartRowEl, cartColEl, prodDetEl, prodImgEl, cartSubEl;
    var nProds = this.products.length;
    var prod;
    
    cartEl = document.getElementById(cartElId);
    
    cartEl.innerHTML = '';
    if (nProds) {
        // Cart product list header. It'd be too tedious to create it programmatically as the list itself
        cartEl.innerHTML = '<div class="cart-header-flex">'
            +'<div class="cart-list-col-wide">Product Details</div><div class="cart-list-col">unit Price</div>'
            +'<div class="cart-list-col">Quantity</div><div class="cart-list-col">shipping</div>'
            +'<div class="cart-list-col">Subtotal</div><div class="cart-list-col">ACTION</div></div>';
        for (var i = 0; i < nProds; i++) {
            prod = this.products[i];
            cartRowEl = document.createElement('div');
            cartRowEl.classList.add('cart-row-flex');

                cartColEl = document.createElement('div');      
                cartColEl.classList.add('cart-list-col-wide');
                    prodImgEl = document.createElement('img');
                    prodImgEl.classList.add('cart-list-img');
                    prodImgEl.alt = prod.name;
                    prodImgEl.src = IMG_DIR + prod.image;
                    cartColEl.appendChild(prodImgEl);

                    prodDetEl = document.createElement('div');
                    prodDetEl.classList.add('cart-prod-details');
                        // <span class="cart-prod-name"></span>
                        cartSubEl = document.createElement('span');
                        cartSubEl.classList.add('cart-prod-name');
                        cartSubEl.textContent = prod.name;
                        prodDetEl.appendChild(cartSubEl);
                        //<p class="cart-prod-params">Color:<span class="cart-prod-param-value">Red</span><br>
                        //Size:<span class="cart-prod-param-value">Xll</span></p>
                        // could be short description for simplicity
                        // in original shopcart design it was a list of product attributes
                        cartSubEl = document.createElement('p');
                        cartSubEl.classList.add('cart-prod-params');
                        cartSubEl.textContent = prod.short_descr;
                        prodDetEl.appendChild(cartSubEl);

                    cartColEl.appendChild(prodDetEl);
                cartRowEl.appendChild(cartColEl);

                // price col //<div class="cart-list-col">$150</div>
                cartColEl = document.createElement('div');
                cartColEl.classList.add('cart-list-col');
                cartColEl.textContent = prod.price;
                cartRowEl.appendChild(cartColEl);

                //quantity <div class="cart-list-col"><input class="cart-list-quant" type="text" value="2"></div>
                cartColEl = document.createElement('div');
                cartColEl.classList.add('cart-list-col');
                    cartSubEl =  document.createElement('input');
                    cartSubEl.classList.add('cart-list-quant');
                    cartSubEl.type = 'text';
                    //cartSubEl.value = prod.quantity; //doesn't set the default value
                    cartSubEl.setAttribute('value', prod.quantity);  //sets the initial value
                    cartColEl.appendChild(cartSubEl);
                cartRowEl.appendChild(cartColEl);

                //shipping <div class="cart-list-col">FREE</div>
                cartColEl = document.createElement('div');
                cartColEl.classList.add('cart-list-col');
                cartColEl.innerHTML = 'FREE';
                cartRowEl.appendChild(cartColEl);

                //subtotal <div class="cart-list-col">300</div>
                cartColEl = document.createElement('div');
                cartColEl.classList.add('cart-list-col');
                cartColEl.innerHTML = prod.price*prod.quantity;
                cartRowEl.appendChild(cartColEl);

                //remove from cart <div class="cart-list-col"><span class="cart-prod-del">&#xe80c;</span></div>
                cartColEl = document.createElement('div');
                cartColEl.classList.add('cart-list-col');
                    cartSubEl = document.createElement('span');
                    cartSubEl.classList.add('cart-prod-del');
                    cartSubEl.id = prod.id + '-del';
                    cartSubEl.innerHTML = '&#xe80c;';
//QUESTION PART 2/2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
//the following line doesn't work here for some reason
                    //cartSubEl.addEventListener('click', delCartProductClick);
                    cartColEl.appendChild(cartSubEl);
                cartRowEl.appendChild(cartColEl);

            cartEl.appendChild(cartRowEl);
            
        }

        cartEl.innerHTML += '<p class="cart-summary-empty">В корзине: ' + (nProds) + ' '
                        + ofProdsText(nProds) + ' на сумму ' +  this.getTotalPrice().toFixed(2) + ' рублей</p>';
    }
    else { //empty cart
        cartEl.innerHTML = '<p class="cart-summary-empty">Корзина пуста</p>';
    }
}



// ==============================================================================
// on button click define the clicked product ID and remove it from the shopCart
// ==============================================================================
function delCartProductClick(e) {
    //var prodId = buttonIdToProdId(event.target.id);
    var prodId = buttonIdToProdId(e.target.id);
    //console.log('id ' + e.target.id);
    shopCart.delProductById(prodId);
    shopCart.view('cart');
}

// =========================================================
// store/restore cart data between sessions/ on page reload
// currently not in use atm
// =========================================================
// store cart in localSession
function storeCart() {
    var cartJSON = JSON.stringify(shopCart);
    localStorage.setItam('cartProdsJSON', cartJSON);
}

// loads cart data from localStorage to the global array
// maybe should create and return an array of data
function loadCart() {
    var cartJSON =  localStorage.getItam('cartProdsJSON');
    if (cartJSON) {
        shopCart = JSON.parse(cartJSON);
    }
}

function ofProdsText(nProds) {
    var rem = nProds%10;

    if (rem === 1)  {
        return 'товар';
    }
    else {
        if (rem === 0 || rem > 4) {
            return 'товаров';
        }
        else {
            return 'товара';
        }
    }
}


function init() {
    //adding some products to the catalog section
    makeCatalogParms();

    // attaching the listener to a static element 'cause attaching to dynamically created span element fails
    document.getElementById('cart').addEventListener('click', function delProdListener (e) {
        if (e.target.classList.contains('cart-prod-del')) {
            delCartProductClick(e);
        }
    });
}

window.onload = init;
