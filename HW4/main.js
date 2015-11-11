/*
 * HW requirements:
 Your task is to implements ProductLineItem, ProductlineItemContainer, Basket and Order classes;
 
 ProductLineItem works the same way as in 1-st home work
 
 In Basket should be implemented two additional methods:
 
 static getBasket creates instance of basket if it is called first time, returns created basket if its called again
 placeOrder: create an order from basket, removes basket
 
 ProductlineItemContainer class which is extended by Basket And Order, implements shared functionality (for example getTotalPrice)
 
 Order: Contains product line items, 
 it has status. 
 It does not have basket methods as removeProduct, addProduct, updateProductQuantity. 
 it has getTotalPrice.
 It has setStatus method which changes order status
 
 You can use the code from first HW. Please contact me in case of any questions.
 */

// my inspiration https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
"use strict";
// Product 'class' constructor
var Product = function (id, name, price, inventory) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.inventory = inventory;
};

var stockProducts = [];
stockProducts.push(new Product(0, "test", 12.9, 20));
stockProducts.push(new Product(1, "test2", 30, 80));

var ORDER = {};
ORDER.STATUS_PLACED = "placed";
ORDER.STATUS_DELIVERED = "delivered";
ORDER.STATUS_CANCELLED = "cancelled";
var orders = [];

// PRODUCT LIST ITEM================================================================================
// object for storing product and its quantity in some List
function ProductListItem(product, quantity) {
    this.product = product;
    this.quantity = quantity; // initial quantity
}
ProductListItem.prototype = {
    getTotalPrice: function () {
        return this.product.price * this.quantity;
    },
    toString: function () {
        return "{" + this.product.id + "," + this.product.name + "," + this.product.price + "," + this.product.inventory + "," + this.quantity + "}";
    }
};

// PRODUCT LIST=====================================================================================
// object for storing list of ProductListItems
var ProductList = function () {
    this.productsList = []; // list of ProductListItems
};
ProductList.prototype = {
    addProductListItem: function (productListItem) {
        this.productsList.push(productListItem);
    },
    getTotalPrice: function () {
        var sum = 0;
        var i;
        for (i = 0; i < this.productsList.length; i++) {
            sum += this.productsList[i].getTotalPrice();
        }
        return sum;
    },
    toString: function () {
        return "{ productsList size: " + this.productsList.length + "}";
    }
};

// BASKET===========================================================================================
// new class Basket and this is its constructor
function Basket() {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    ProductList.call(this); // basket extends ProductList
}
// we need to inherit methods from ProductList prototype
Basket.prototype = Object.create(ProductList.prototype); // See note below
// Set the "constructor" property to refer to Basket
Basket.prototype.constructor = Basket;  // important to use this!!!
Basket.prototype.getProductList = function () {
    return this.productsList;
};
Basket.prototype.placeOrder = function () {
    var newOrder = new Order(orders.length);
    newOrder.setProductsList(this.productsList);
    orders.push(newOrder);
    this.productsList = [];
    // refresh situation in html
    refreshBasketTable();
};
Basket.prototype.addProduct = function (productID) {
    console.log("adding product with ID: " + productID);
    if (productID < 0 || productID >= stockProducts.length) {
        throw Error("wrong product ID");
        return;
    }
    var item = stockProducts[productID];
    console.log("product found, adding: " + item.name + "," + item.price + "," + item.inventory);
    if (item.inventory > 0) {
        item.inventory--;
        var itemIsInBasket = false;
        for (var i = 0; i < this.productsList.length; i++) {
            if (this.productsList[i].product.id === productID) {
                this.productsList[i].quantity++;
                console.log("item already in basket, incrementing quantity");
                itemIsInBasket = true;
            }
        }
        if (!itemIsInBasket) {
            console.log("item NOT in basket, inserting item");
            this.addProductListItem(new ProductListItem(item, 1));
        }
    } else {
        throw Error("item not in inventory");
    }
    console.log("new inventory status: " + getInventoryString());
    console.log("new items status: " + this.productsList.toString());
    refreshBasketTable();
};
Basket.prototype.removeProduct = function (productID) {
    console.log("removing product with ID: " + productID);
    if (productID < 0 || productID >= stockProducts.length) {
        throw Error("wrong product ID");
        return;
    }
    var newItems = [];
    var productListItem;
    var removed = false;
    // iterating ProductListItems
    for (var i = 0; i < this.productsList.length; i++) {
        productListItem = this.productsList[i];
        if (productListItem.product.id !== productID) {
            newItems.push(productListItem);
        } else {
            // not include in new list and update inventory
            stockProducts[productID].inventory += productListItem.quantity;
            removed = true;
        }
    }
    this.productsList = newItems;
    if (!removed) {
        throw Error("Product with id " + productID + " not in basket.");
    }
    console.log("new inventory status: " + getInventoryString());
    refreshBasketTable();
};
Basket.prototype.updateProductQuantity = function (productID, quantity) {
    if (productID < 0 || productID >= stockProducts.length) {
        throw Error("wrong product ID");
        return;
    }
    if (quantity < 0) {
        throw Error("wrong quantity size");
        return;
    }
    var ourProductListItem;
    // find our product in ProductListItems
    for (var i = 0; i < this.productsList.length; i++) {
        if (this.productsList[i].product.id === productID) {
            ourProductListItem = this.productsList[i];
            break;
        }
    }
    if (ourProductListItem !== undefined) {
        if (quantity <= ourProductListItem.quantity) {
            // safe to change quantity, because decreasing quantity of item in basket
            stockProducts[productID].inventory += ourProductListItem.quantity - quantity;
            ourProductListItem.quantity = quantity;
        } else {
            // not safe to increase quantity, check if available
            if (stockProducts[productID].inventory >= quantity - ourProductListItem.quantity) {
                stockProducts[productID] += quantity - ourProductListItem.quantity;
                ourProductListItem.quantity = quantity;
            } else {
                throw Error("Product with id " + productID + " does not have enough items in inventory. " +
                        "Requested " + (quantity - ourProductListItem.quantity) + " but have available only " + (stockProducts[productID].inventory));
            }
        }
    } else {
        throw Error("Product with id " + productID + " not in basket.");
    }
    refreshBasketTable();
};


// ORDER============================================================================================
function Order(id) {
    ProductList.call(this); // Order extends ProductList
    this.status = ORDER.STATUS_PLACED; // default constructor status 
    this.id = id;
}
// we inherit getTotalPrice from ProductList
Order.prototype = Object.create(ProductList.prototype);
Order.prototype.setStatus = function (status) {
    this.status = status;
};
Order.prototype.getProductsList = function () {
    return this.productsList;
};
Order.prototype.setProductsList = function (productsList) {
    this.productsList = productsList;
};
Order.prototype.toString = function () {
    return JSON.stringify(this.productsList);
};
Order.prototype.constructor = Order;

//==================================================================================================
var BasketFactory = function () {
    var basket;

    function createInstance() {
        var basket = new Basket();
        return basket;
    }

    return {
        getBasketInstance: function () {
            if (!this.basket) {
                this.basket = createInstance();
            }
            return this.basket;
        }
    };
};

function getInventoryString() {
    var string = "";
    for (var i = 0; i < stockProducts.length; i++) {
        string += "{" + stockProducts[i].id + "," + stockProducts[i].name + "," + stockProducts[i].price + "," + stockProducts[i].inventory + "],";
    }
    return string;
}

var basket = BasketFactory().getBasketInstance();
console.log("basket is instance of Basket: " + (basket instanceof Basket));

function orderButtonClicked() {
    basket.placeOrder();
    var orderList = document.getElementById('orderList');
    var innerHtml = '';
    orderList.innerHTML='';
    for (var i = 0; i < orders.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("id: [" + orders[i].id + "] status: [" + orders[i].status + "] total price: ["+orders[i].getTotalPrice()+"] items: " +orders[i].toString()));
        orderList.appendChild(li);
    }
}

function refreshInventoryTable() {
    console.log("refreshInventoryTable");
    //var body = document.getElementsByTagName('body')[0];
    //var tbl = document.createElement('table');
    //tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('name'));
    var th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('price'));
    var th3 = document.createElement('th');
    th3.appendChild(document.createTextNode('inventory'));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tbdy.appendChild(tr);
    for (var i = 0; i < stockProducts.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(stockProducts[i].name));
        var td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(stockProducts[i].price));
        var td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(stockProducts[i].inventory));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbdy.appendChild(tr);
    }
    var table = document.getElementById('inventoryTable');
    table.innerHTML = tbdy.innerHTML;
    //tbl.appendChild(tbdy);
    //body.appendChild(tbl)
}

function getProductQuantity(productID) {
    console.log("getProductQuantity: ");
    console.log("basket items size: " + basket.getProductList().length);
    for (var i = 0; i < basket.getProductList().length; i++) {
        var productListItems = basket.getProductList();
        if (productListItems === undefined) {
            console.log("basket items undefined: ");
            return 0;
        }
        //
        if (productListItems[i].product.id === productID) {
            console.log("item: [" + productListItems[i].toString() + "]");
            return productListItems[i].quantity;
        }
    }
    return 0;
}

function refreshBasketTable() {
    refreshInventoryTable();
    console.log("refreshBasketTable");
    //var body = document.getElementsByTagName('body')[0];
//                var tbl = document.createElement('table');
//                tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('name'));
    var th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('quantity'));
    var th3 = document.createElement('th');
    th3.appendChild(document.createTextNode('price'));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tbdy.appendChild(tr);
    for (var i = 0; i < stockProducts.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(stockProducts[i].name));
        var td2 = document.createElement('td');
        var quantity = getProductQuantity(i);
        td2.appendChild(document.createTextNode(quantity));
        var td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(quantity * stockProducts[i].price));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbdy.appendChild(tr);
    }
    var table = document.getElementById('basketTable');
    table.innerHTML = tbdy.innerHTML;
    //table.appendChild(tbdy);
    //body.appendChild(table)
    var priceParagraph = document.getElementById('totalPriceParagraph');
    priceParagraph.innerHTML = (document.createTextNode("Total price is: " + basket.getTotalPrice() + ".")).wholeText + '&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="orderButtonClicked()">ORDER</button>';

}

function tableButtonsCreate() {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var headings = ["addProduct:", "removeProduct:", "TODO: updateQuantity:"];
    for (var j = 0; j < 3; j++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(headings[j]));
        tr.appendChild(td);
        for (var i = 0; i < stockProducts.length; i++) {
            var button = document.createElement('button');
            if (j === 0) {
                button.appendChild(document.createTextNode("add " + stockProducts[i].name));
                button.setAttribute("onClick", "basket.addProduct(" + i + ")");
            }
            if (j === 1) {
                button.appendChild(document.createTextNode("remove " + stockProducts[i].name));
                button.setAttribute("onClick", "basket.removeProduct(" + i + ")");
            }
            if (j === 2) {
                var x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                x.setAttribute("size", "2");
                x.setAttribute("id", "input" + stockProducts[i].name);
                x.setAttribute("value", "1");
                tr.appendChild(x);
                button.appendChild(document.createTextNode("update " + stockProducts[i].name));
                // TODO: make possible updating different number than 1        
                button.setAttribute("onClick", "basket.updateProductQuantity(" + i + ",1)");
            }
            tr.appendChild(button);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}
/*
 
 class ProductLineItem{
 
 }
 class ProductlineItemContainer {
 //implement
 getTotalPrice(){
 //implement
 }
 }
 
 class Order extends ProductlineItemContainer {
 //implement
 setStatus() {
 //implement
 }
 }
 
 class Basket extends ProductlineItemContainer {
 static getBasket(){
 //implement
 }
 addProduct(productID){
 //implement
 }
 removeProduct(productID){
 //implement
 }
 updateProductQuantity(productID, quantity) {
 //implement
 }
 
 placeOrder() {
 //implement
 }
 }
 console.log(Basket)
 */