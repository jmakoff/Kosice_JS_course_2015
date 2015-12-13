var socket = io('http://localhost:3000/merchant');

$(document).ready(function () {

    refreshJQueryButtons();
});

socket.on('productsAdded', function (products) {
    console.log("productsAdded new products: " + products);
    refreshProductsContainer(products);

    alert("Your new product is added!");
});

socket.on('productsUpdated', function (products) {
    console.log("productsUpdated new products: " + products);
    refreshProductsContainer(products);

    alert("Your product is updated!");
});

socket.on('productsRemoved', function (products) {
    console.log("productsRemoved new products: " + products);
    console.log(products);
    refreshProductsContainer(products);

    alert("Your product is removed!");
});

socket.on('orderMaked', function (orders) {
    console.log("new order is maked, refreshing orders list");
    var divLeftHtml = "<h2>Orders</h2>";
    for (var i = orders.length-1; i >=0; i--) {
        divLeftHtml += '<div class="order">' +
            '<div><span>Order '+i+' Total price: '+orders[i].totalPrice+' Status: '+orders[i].status+'</span></div></div>';
    }

    document.getElementById('ordersContainer').innerHTML = divLeftHtml;
    //alert("Your order is processed!");
});

function refreshProductsContainer(products) {
    var divLeftHtml = "";
    for (var i = 0; i < products.length; i++) {
        divLeftHtml += '<div class="product-container border">' +
            '<div><input value="' + products[i].name + '" name="product_' + i + '_name" type="text"/></div>' +
            '<div><span>Price:</span><input value="' + products[i].price + '" name="product_' + i + '_price" type="text"/></div>' +
            '<div><span>inventory:</span><input value="' + products[i].inventory + '" name="product_' + i + '_inventory" type="text"/></div>' +
            '<div class="product-buttons"><button class="js_update-product">Update</button><button class="js_remove-product">Remove</button></div>' +
            '</div>';
    }
    divLeftHtml += '<div id="addProductContainer" class="product-container border new-product-container">' +
        '<div class="name"><input value="" name="name" type="text"/></div>' +
        '<div class="price"><span>Price:</span><input value="" name="price" type="text"/></div>' +
        '<div class="inventory"><span>inventory:</span><input value="" name="inventory" type="text"/></div>' +
        '<div class="product-buttons"><button id="addProductButton" class="js_add-product">Add</button></div>' +
        '</div>';
    document.getElementById('productsContainer').innerHTML = divLeftHtml;
    refreshJQueryButtons();
}

function refreshJQueryButtons() {
    $('#addProductButton').click(function () {
        console.log("addProductButton into database clicked: ");
        var name = $("div#addProductContainer.product-container.border.new-product-container div.name input").val();
        var price = $("div#addProductContainer.product-container.border.new-product-container div.price input").val();
        var inventory = $("div#addProductContainer.product-container.border.new-product-container div.inventory input").val();
        console.log(name + ":" + price + ":" + inventory);
        var newProduct = {};
        newProduct.name = name;
        newProduct.price = price;
        newProduct.inventory = inventory;
        socket.emit("addProduct", newProduct);
    });
    $('.js_update-product').click(function () {
        console.log("updateProductButton into database clicked: ");
        //console.log($(this).parent().parent());
        var container = $(this).parent().parent();
        var name = container.find("div.name input").val();
        var price = container.find("div.price input").val();
        var inventory = container.find("div.inventory input").val();
        var id = parseInt(container.attr("productID"));
        console.log(id + ":" + name + ":" + price + ":" + inventory);
        var newProduct = {};
        newProduct.name = name;
        newProduct.price = price;
        newProduct.inventory = inventory;
        newProduct.id = id;
        socket.emit("updateProduct", newProduct);
    });
    $('.js_remove-product').click(function () {
        var container = $(this).parent().parent();
        var id = parseInt(container.attr("productID"));
        console.log("remove product button clicked for product: "+id);
        socket.emit("removeProduct", id);
    });
}