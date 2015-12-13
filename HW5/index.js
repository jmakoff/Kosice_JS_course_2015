/*
 * Hi guys,

 Socket.io docs - http://socket.io/docs/

 Home work details:
 When you pull master brunch of our repository HW5 folder will appear.
 After installing NodeJS and npm just run "npm install" in console in HW5 folder.
 Your task is to define behavior of real time shop. You have two roles customer(/) and merchant (/merchant)

 Customer can:
 Add product to basket, update product in basket, remove product from basket and place order.

 Merchant can:
 add/update/remove products, see created orders

 Products are shared, that means if merchant add something, customer should see it in real time.
 Please contact me in case of any questions.

 Good luck!
 Sergey.
 * */

"use strict"
console.log("starting server...");
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    shop = require("./shop"),
    io = require("socket.io")(http);

app.use(express.static('public'));

var orders = shop.orders;

app.set('view engine', 'ejs');


//Customer
app.get('/', function (req, res) {
    res.render("index", {
        products: shop.products
    });
});
io.on('connection', function (socket) {
    var basket = new shop.Basket();
    var address = 'default';
    address = socket.handshake.address + ':' + socket.handshake.port;
    console.log("new client connected " + address);

    socket.on("addProduct", function (data) {
        console.log("client " + address + " wants to add product with ID [" + data.productID + "] into basket.");
        basket.addProduct(parseInt(data.productID));
        console.log("product " + data.productID + " added");
        socket.emit("basketChanged", basket);
    });
    socket.on("decrementProduct", function (data) {
        console.log("client " + address + " wants to decrement product with ID [" + data.productID + "].");
        basket.decrementProduct(parseInt(data.productID));
        socket.emit("basketChanged", basket);
    });
    socket.on("removeProduct", function (data) {
        console.log("client " + address + " wants to remove product with ID [" + data.productID + "] from basket.");
        basket.removeProduct(parseInt(data.productID));
        socket.emit("basketChanged", basket);
    });
    socket.on("makeOrder", function (data) {
        console.log("client " + address + " wants to makeOrder");
        var order = basket.placeOrder();
        order.setStatus(shop.Order.STATUS_PLACED);
        console.log("order placed, basket deleted");

        socket.emit("orderMaked", order);
        merchantIO.emit("orderMaked", orders);
    });
});


//Merchant
var merchantIO = io.of('/merchant');
app.get('/merchant', function (req, res) {
    res.render("merchant", {
        products: shop.products,
        orders: shop.orders
    });
});
merchantIO.on("connection", function (socket) {
    var products = shop.products;
    var address = socket.handshake.address + ':' + socket.handshake.port;
    console.log("merchant connected from " + address);

    socket.on("addProduct", function (newProduct) {
        newProduct.id = products.length;
        products.push(newProduct);
        //console.log(newProduct);
        console.log("merchant " + address + " wants to add product [" + newProduct + "] into database.");
        console.log(products);
        socket.emit("productsAdded", products);
        io.emit("productsAdded", products);
    });
    socket.on("updateProduct", function (newProduct) {
        console.log(newProduct);
        console.log("merchant " + address + " wants to update product [" + newProduct + "] into database.");
        products[newProduct.id].name = newProduct.name;
        products[newProduct.id].price = newProduct.price;
        products[newProduct.id].inventory = newProduct.inventory;
        console.log(products);
        socket.emit("productsUpdated", products);
        io.emit("productsUpdated", products);
    });
    socket.on("removeProduct", function (productID) {
        console.log("merchant " + address + " wants to remove product [" + productID + "] from database.");
        var productID = parseInt(productID);
        var newProducts = [];
        var removed = false;
        for (var i = 0; i < products.length; i++) {
            var prod = products[i];
            if (prod.id != productID) {
                prod.id = newProducts.length;
                newProducts.push(prod);
            } else {
                // we will not include chosen product into new products list
                removed = true;
            }
        }
        products = newProducts;
        console.log("product with id " + productID + " removed status: " + removed);
        socket.emit("productsRemoved", products);
        io.emit("productsRemoved", products);
    });
});

var server = http.listen(3000);
console.log("server started and listening on port 3000");


























