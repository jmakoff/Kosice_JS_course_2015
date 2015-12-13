var socket = io('http://localhost:3000');

socket.on('productsAdded', function (products) {
    console.log("productsAdded: " + products);
    refreshProductsContainer(products);

    alert("Products added!");
});

socket.on('productsUpdated', function (products) {
    console.log("productsUpdated: " + products);
    refreshProductsContainer(products);
    // TODO: update products in basket
    alert("Products updated!");
});

socket.on('productsRemoved', function (products) {
    console.log("productsRemoved new products: " + products);
    refreshProductsContainer(products);

    alert("Administrator removed product!");
});

socket.on('basketChanged', function (basket) {
    console.log("basketChanged, refreshing basket table");
    console.log(basket);
    var table = '<table>';
    var row = '<tr><td>name</td><td>quantity</td><td>price</td></tr>';
    table += row;

    for (var i = 0; i < basket.productLineItems.length; i++) {
        var item = basket.productLineItems[i];
        row = '<tr><td>' + item.product.name + '</td><td>' + item.qty + '</td><td>' + item.total + '</td>' +
            '<td><button onclick="decrementProduct(' + item.product.id + ')">-</button>' +
            '<button onclick="removeProduct(' + item.product.id + ')">X</button></td></tr>';
        table += row;
    }

    table += '</table>';
    table += '<p>Total price: ' + basket.totalPrice + '</p>';
    if (basket.totalPrice > 0) {
        table += '<button id="makeOrder" onclick="orderButtonClicked()">ORDER</button>';
    }
    //console.log("inner html: "+table);
    if (basket.productLineItems.length > 0) {
        document.getElementById('product-line-items').innerHTML = table;
    } else {
        document.getElementById('product-line-items').innerHTML = "";
    }
});

socket.on('orderMaked', function (order) {
    console.log("order is maked, refreshing basket");
    var orderHtml = '<div class="basket-container left border">'
        + '<h2>Order</h2>'
        + '<div id="orderDetails"><p>total price: ' + order.totalPrice + '</p><p>status: ' + order.status + '</p>'
        + '</div>        </div>';
    var orderDiv = document.createElement("div").innerHTML = orderHtml;
    // document.getElementsByTagName('body')[0].appendChild(orderDiv);
    $('body').append(orderDiv);
    document.getElementById('product-line-items').innerHTML = "";
    alert("Your order is processed!");
});

$(document).ready(function () {
    refreshJQueryButtons();
});

function refreshProductsContainer(products) {
    var divLeftHtml = "";
    for (var i = 0; i < products.length; i++) {
        divLeftHtml += '<div class="product-container border"><h2>' + products[i].name + '</h2>' +
            '<div><span>Price:</span><span>' + products[i].price + '</span></div>' +
            '<button data-product-id="' + products[i].id + '" class="js_add-to-cart">Add to Cart</button></div>';
    }

    document.getElementById('productsContainer').innerHTML = divLeftHtml;
    refreshJQueryButtons();
}

function refreshJQueryButtons() {
    $('.js_add-to-cart').click(function () {
        var productID = $(this).attr("data-product-id");
        console.log("data-product-id button clicked with parameter: " + productID);
        socket.emit("addProduct", {productID: productID});
    });
}

function orderButtonClicked() {
    console.log("order button clicked ");
    socket.emit("makeOrder");
}
function decrementProduct(productID) {
    console.log("decrementProduct button clicked ");
    socket.emit("decrementProduct", {productID: productID});
}
function removeProduct(productID) {
    console.log("removeProduct button clicked ");
    socket.emit("removeProduct", {productID: productID});
}