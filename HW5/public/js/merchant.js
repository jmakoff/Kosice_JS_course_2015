var socket = io('http://localhost:3000/merchant');

socket.on('orderPlaced', function() {
	location.reload();
});

socket.on('productsChanged', function() {
	location.reload();
});

$(function() {
	$(".js_remove-product").on("click", function() {
		socket.emit('removeProduct', {
			productId : $(this).data("productId")
		});
	});
	$(".js_update-product").on("click", function() {
		socket.emit('updateProduct', {
			productId : $(this).data("productId"),
			name : $("input[name='product_" + $(this).data("productId") + "_name']").val(),
			price : $("input[name='product_" + $(this).data("productId") + "_price']").val(),
			inventory : $("input[name='product_" + $(this).data("productId") + "_inventory']").val()
		});
	});
	$(".js_add-product").on("click", function() {
		socket.emit('addProduct', {
			name : $("input[name='product_new_name']").val(),
			price : $("input[name='product_new_price']").val(),
			inventory : $("input[name='product_new_inventory']").val()
		});
	});
})
