var IMG_DIR = 'images/';
var TMB_DIR = 'thumbnails/';

// 'dummy' product data. should fill the product data from a remote DB later
// quantity here is the quantity in stock. don't really need it atm
// shortdescr is ommited 
var shopProds = [
    {id:1, name:'Apple', short_descr: 'lorem apple', price:5.99, quantity: 5, unit: 'кг', image: 'apple01.jpg'},
    {id:2, name:'Pear', short_descr: 'lorem pear', price:6.99, quantity: 2, unit: 'кг', image: 'pear01.jpg'},
    {id:3, name:'Peach', short_descr: 'lorem peacj', price:6.99, quantity: 3, unit: 'кг', image: 'peach01.jpg'},
    {id:4, name:'Plum', short_descr: 'lorem plum', price:4.99, quantity: 4, unit: 'кг', image: 'plum01.jpg'},
    {id:5, name:'Banana', short_descr: 'lorem banana', price:4.99, quantity: 4, unit: 'кг', image: 'banana01.jpg'},
    {id:6, name:'Pineapple', short_descr: 'lorem pineapple', price:7.99, quantity: 1, unit: 'шт', image: 'pineapple01.jpg'}
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


// =============================================================================
// converts button id to DB product Id.  just stripping extra junk off the Id
// =============================================================================
function buttonIdToProdId(btnId) {
    var idArr = btnId.split('-');
    if (idArr.length) {
        if (isNaN( idArr[0] )) return -1;
        return parseInt(idArr[0], 10); 
    }
    return -1;
}

// =========================================================
// get the product index which id matches the passed prodId
// if no matching Id found, returns -1
// =========================================================
function getProdIndexById(products, prodId) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == prodId) return i; //made less strict comparison, so now string prodId works too
    }
    return -1;
}

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
                    cartSubEl.id = prod.id + '-quant';
                    cartSubEl.type = 'text';
                    //cartSubEl.value = prod.quantity; //doesn't set the default value
                    cartSubEl.setAttribute('value', prod.quantity);  //sets the initial value
                    //cartSubEl.addEventListener('change', handleQuantityChange);
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
                    cartSubEl.addEventListener('click', handleDelCartProductClick);
                    cartColEl.appendChild(cartSubEl);
                cartRowEl.appendChild(cartColEl);

            cartEl.appendChild(cartRowEl);
            
        }

        // avoiding global cart HTML reassignment. kinda replaces 'innerHTML +='
        var innerHtmlWrapperEl = document.createElement('div');
        //'If the element has no parent element, setting its outerHTML property will not change it or its descendants. '
        // Assigning child and then then using outerHTML worked, but idk if it's reliable, so I added a wrapper
        innerHtmlWrapperEl.innerHTML = '<p class="cart-summary-empty">В корзине: ' + (nProds) + ' '
                + ofProdsText(nProds) + ' на сумму ' +  this.getTotalPrice().toFixed(2) + ' рублей</p>';
        cartEl.appendChild(innerHtmlWrapperEl);

        
        /* another workaround for attaching listeners to changed elements
        var btns = document.querySelectorAll('.cart-prod-del');
        for (var i = 0; i< btns.length; i++) {
            btns[i].addEventListener('click', handleDelCartProductClick);
        } 
        */
    }
    else { //empty cart
        cartEl.innerHTML = '<p class="cart-summary-empty">Корзина пуста</p>';
    }
}


// ==============================================================================
// on button click define the clicked product ID and remove it from the shopCart
// ==============================================================================
function handleDelCartProductClick(e) {
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
function saveCart() {
    var cartJSON = JSON.stringify(shopCart.products);
    localStorage.setItem('cartProdsJSON', cartJSON);
}

// loads cart data from localStorage to the global array
// maybe should create and return an array of data
// not used atm
function loadCart() {
    var cartJSON =  localStorage.getItem('cartProdsJSON');
    if (cartJSON) {
        shopCart.products = JSON.parse(cartJSON);
    }
}

// ===========================================================================
// Russian noun Product in singular/plural form (masculine, 2nd declension)
// ===========================================================================
function ofProdsText(nProds) {
    var rem10 = nProds%10;
    var rem100 = nProds%100;

    if (rem10 === 1)  { // singular case
        return 'товар';
    }
    else {
        if (rem10 === 0 || rem10 > 4 || rem100 === 12 || rem100 === 13 || rem100 === 14) { 
            return 'товаров'; // plural, genitive case
        }
        else {
            return 'товара'; // single, genitive case
        }
    }
}

// 
function handleQuantityUpdateClick() {
    var quantityEl;
    
    for (var i = 0; i < shopCart.products.length; i++) {
        quantityEl = document.getElementById(String(shopCart.products[i].id) + '-quant');
        shopCart.products[i].quantity = parseInt(quantityEl.value, 10);
    }

}

// ===========================================================================================
function initCartPage() {
    // save cart contents to use on the cart page
    document.getElementById('go2catalog').addEventListener('click', function () {
        saveCart();
    });

    loadCart();

    shopCart.view('cart');

    document.getElementById('save-cart').addEventListener('click', function (e) {
        e.preventDefault();
        saveCart();
    });    


}

function handlePageUnload(e) {
    saveCart();
    alert('Unloading the page');
    return false;
}

window.addEventListener('load', initCartPage);
window.addEventListener('beforeunload', handlePageUnload);