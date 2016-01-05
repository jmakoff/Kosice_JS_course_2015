var socket = io('http://localhost:3000/merchant');

socket.on('orderPlaced', function(data) {
	var ordersListing = "<div class=\"orders-container left border\"><h2>Orders</h2>";
	for (var i = 0; i < data.orders.length; i++) {
		var totalPrice = 0;
		for (var j = 0; j < data.orders[i].productLineItems.length; j++) {
			totalPrice += data.orders[i].productLineItems[j].total;
		} 
		ordersListing += "<div class=\"order\"><div><span>Total price </span><span>" + totalPrice + "</span></div></div>";
	}
	ordersListing += "</div>";
	$(".orders-container").replaceWith(ordersListing);
});

socket.on('productsChanged', function(data) {
	var productsListing = "<div class=\"left\">";
	for (var i = 0; i < data.products.length; i++) {
		productsListing += "<div class=\"product-container border\"><div><input value=\"" + data.products[i].name + "\" name=\"product_" + i + "_name\" type=\"text\"/></div><div><span>Price: </span><input value=\"" + data.products[i].price + "\" name=\"product_" + i + "_price\" type=\"text\"/></div><div><span>inventory: </span><input value=\"" + data.products[i].inventory + "\" name=\"product_" + i + "_inventory\" type=\"text\"/></div><div class=\"product-buttons\"><button class=\"js_update-product\" data-product-id=\"" + i + "\">Update</button><button class=\"js_remove-product\" data-product-id=\"" + i + "\">Remove</button></div></div>";
	}
	productsListing += "<div class=\"product-container border new-product-container\"><div><input value=\"\" name=\"product_new_name\" type=\"text\"/></div><div><span>Price: </span><input value=\"\" name=\"product_new_price\" type=\"text\"/></div><div><span>inventory: </span><input value=\"\" name=\"product_new_inventory\" type=\"text\"/></div><div class=\"product-buttons\"><button class=\"js_add-product\">Add</button></div></div></div>";
	$(".product-container").parent().replaceWith(productsListing);
});

socket.on('wrongFormat', function() {
	alert("Wrong format.\nPrice and inventory must be number!");
});

$(function() {
	$("body").on("click", ".js_remove-product", function() {
		socket.emit('removeProduct', {
			productId : $(this).data("productId")
		});
	});
	$("body").on("click", ".js_update-product", function() {
		socket.emit('updateProduct', {
			productId : $(this).data("productId"),
			name : $("input[name='product_" + $(this).data("productId") + "_name']").val(),
			price : $("input[name='product_" + $(this).data("productId") + "_price']").val(),
			inventory : $("input[name='product_" + $(this).data("productId") + "_inventory']").val()
		});
	});
	$("body").on("click", ".js_add-product", function() {
		socket.emit('addProduct', {
			name : $("input[name='product_new_name']").val(),
			price : $("input[name='product_new_price']").val(),
			inventory : $("input[name='product_new_inventory']").val()
		});
	});
})
