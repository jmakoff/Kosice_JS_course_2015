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
	socket.on("addProduct", function(data) {
		basket.addProduct(data.pid);
		socket.emit("productAdded", {
			succses : true,
			basket : basket
		});
	});
	io.to("merchant").emit("orderPlaced")
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
	
	socket.join("merchants")
});

var server = http.listen(3000);


























