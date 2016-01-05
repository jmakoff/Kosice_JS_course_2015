"use strict"
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	shop = require("./shop"),
	io = require("socket.io")(http);
	
app.use(express.static('public'));
app.set('view engine', 'ejs'); 


//Customer
app.get('/', function (req, res) {
	res.render("index", {
		products : shop.products
	});
});
io.on('connection', function (socket) {
	var basket = new shop.Basket();
	socket.join("customers");
	socket.on('addToCart', function(data) {
		console.log("Add: " + data.productId);
		basket.addProduct(data.productId);
		socket.emit('basketContentChanged', {
			success : true,
			basket : basket
		});
	});
	socket.on('placeOrder', function() {
		console.log("Place order with totalPrice: " + basket.getTotalPrice());
		basket.placeOrder();
		basket = new shop.Basket();
		socket.emit('orderPlaced');
		merchantIO.emit('orderPlaced');
	});
	socket.on('removeFromCart', function(data) {
		console.log("Remove: " + shop.Basket.getIDbyName(data.productName));
		basket.removeProduct(shop.Basket.getIDbyName(data.productName));
		socket.emit('basketContentChanged', {
			success : true,
			basket : basket
		});
	});
	socket.on('updateInCart', function(data) {
		var reg = /^[0-9]+$/;
		if (reg.test(data.quantity)) {
			console.log("Update: " + shop.Basket.getIDbyName(data.productName) + " to " + data.quantity);
			basket.updateProductQuantity(shop.Basket.getIDbyName(data.productName), data.quantity);
			socket.emit('basketContentChanged', {
				success : true,
				basket : basket
			});
		}
	});
	socket.on('error', function(error) {
		console.log(error);
		socket.emit("Error", {message : error.message});
	});
});


//Merchant
var merchantIO = io.of('/merchant');
app.get('/merchant', function (req, res) {
	res.render("merchant", {
		products : shop.products,
		orders : shop.orders
	});
}); 
merchantIO.on("connection", function(socket) {
	//implement
	socket.on('removeProduct', function(data) {
		console.log("Remove: " + data.productId);
		shop.products.splice(data.productId, 1);
		socket.emit('productsChanged');
		// socket.join('room') and then io.to('room').emit(...) did not work
		io.emit("productsChanged");
	});
	socket.on('updateProduct', function(data) {
		console.log("Update: " + data.productId + " to: Name: " + data.name + " Price: " + data.price + " Inventory: " + data.inventory);
		shop.products[data.productId].name = data.name;
		shop.products[data.productId].price = data.price;
		shop.products[data.productId].inventory = data.inventory;
		socket.emit('productsChanged');
		io.emit("productsChanged");
	});
	socket.on('addProduct', function(data) {
		console.log("Add: Name: " + data.name + " Price: " + data.price + " Inventory: " + data.inventory);
		shop.products.push(data);
		socket.emit('productsChanged');
		io.emit("productsChanged");
	});
});

var server = http.listen(3000);
