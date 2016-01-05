var socket = io('http://localhost:3000');

socket.on('basketContentChanged', function(data) {
	var totalPrice = 0;
	var listing = '';
	for (var i = 0; i < data.basket.productLineItems.length; i++) {
		var item = data.basket.productLineItems[i];
		totalPrice += item.total;
		listing += item.product.name + ": <b>" + item.qty + "</b> <button data-product-name=\"" + item.product.name + "\" class=\"js_remove-from-cart\">Remove</button> <button data-product-name=\"" + item.product.name + "\" class=\"js_update-in-cart\">Update</button><br/>";
	}
	$(".product-line-items").replaceWith("<div class=\"product-line-items\"> " + listing + "<br/>Total price: <b>" + totalPrice + "</b></div>");
	$(".js_place-order").removeClass("hide");
});

socket.on('orderPlaced', function() {
	$(".product-line-items").replaceWith("<div class=\"product-line-items\"></div>");
	$(".js_place-order").addClass("hide");
});

socket.on('Error', function(error) {
	location.reload();
	alert(error.message + "\nYour page was refreshed.");
});

socket.on('productsChanged', function() {
	location.reload();
	// Should solve this other way, but I do not how.
	alert("Someone changed the product list, so your basket is now empty.");
});

var input = false;

function remove() {
	// get value from input field
	var value = $(".basket-container input").val();
	socket.emit('updateInCart', {
		productName : $("input").data("productName"),
		quantity : value 
	});
	$("input").remove();
	input = false;
}

$(function() {
	$(".js_add-to-cart").on("click", function() {
		socket.emit('addToCart', {
			productId : $(this).data("productId")
		});
	});

	$(".js_place-order").on("click", function() {
		socket.emit('placeOrder');
	});

	$(".basket-container").on("click", ".js_remove-from-cart", function() {
		socket.emit('removeFromCart', {
			productName : $(this).data("productName")
		});
	});
	
	$(".basket-container").on("click", ".js_update-in-cart", function() {
		if (input == false) {
			$(this).after("<input type=\"text\" data-product-name=\"" + $(this).data("productName") + "\" name=\"quantity\">");
			input = true;
		} else {
			remove();
		}
	});

	$(".basket-container").on("keydown", "input", function(event) {
		// check, if "Enter" was pressed, "Enter" has value 13
		if (event.which == 13) {
			remove();
		}		
	});
})
