var products = [{
        id: 0,
        name: "test",
        price: 12.9,
        inventory: 20
    }, {
        id: 1,
        name: "test2",
        price: 30,
        inventory: 80
    }];

function ProductLineItem(product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.quantity = 1;
}

ProductLineItem.prototype = {
    addQuantity: function (quantity) {
        this.quantity += quantity;
    },
    getPrice: function () {
        return (this.price * this.quantity);
    },
    getId: function () {
        return this.id;
    }

};

var basket = (function () {
    var productsInBasket = [];
    return {
        addProduct: function (productID) {
            if (productID >= products.length || productID < 0) {
                throw Error("Invalid product ID !");
            }
            if (products[productID].inventory === 0) {
                throw Error("Product has been sold.");
            }

            var item = new ProductLineItem(products[productID]);
            productsInBasket.push(item);
        },
        removeProduct: function (productID) {
            if (productID >= products.length || productID < 0) {
                throw Error("Invalid product ID !");
            }
            for (var i = 0; i < productsInBasket.length; i++) {
                if (productsInBasket[i].getId() === productID) {
                    productsInBasket.splice(i, 1);

                }
            }
        },
        updateProductQuantity: function (productID, quantity) {
            if (productID >= products.length || productID < 0) {
                throw Error("Invalid product ID !");
            }
            for (var i = 0; i < productsInBasket.length; i++) {
                if (productsInBasket[i].getId() === productID) {
                    productsInBasket[i].addQuantity(quantity);

                }
            }
        },
        getTotalPrice: function () {
            var totalPrice = 0;
            for (var i = 0; i < productsInBasket.length; i++) {

                totalPrice += productsInBasket[i].getPrice;

            }
        }
    };
})();
