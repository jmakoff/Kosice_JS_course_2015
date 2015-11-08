var products = [{
        name: "test",
        price: 12.9,
        inventory: 20
    }, {
        name: "test2",
        price: 30,
        inventory: 80
    }];

function ProductLineItem(product, productID) {
    this.product = product;
    this.productID = productID;
    this.quantity = 1;
}

ProductLineItem.prototype = {
    getTotalPrice: function () {
        return this.product.price * this.quantity;
    },
    toString: function () {
        return "{" + this.product.name + "," + this.product.price + "," + this.product.inventory + "," + this.productID + "," + this.quantity + "}";
    }
};

function getInventoryString() {
    var string = "";
    for (var i = 0; i < products.length; i++) {
        string += "{" + products[i].name + "," + products[i].price + "," + products[i].inventory + "],";
    }
    return string;
}
var basket = (function () {
    var items = [];
    return {
        getItems: function () {
            return items;
        },
        addProduct: function (productID) {
            console.log("adding product with ID: " + productID);
            if (productID < 0 || productID >= products.length) {
                throw Error("wrong product ID");
                return;
            }
            var item = products[productID];
            console.log("product found, adding: " + item.name + "," + item.price + "," + item.inventory);
            if (item.inventory > 0) {
                item.inventory--;
                var itemIsInBasket = false;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].productID === productID) {
                        items[i].quantity++;
                        console.log("item already in basket, incrementing quantity");
                        itemIsInBasket = true;
                    }
                }
                if (!itemIsInBasket) {
                    console.log("item NOT in basket, inserting item");
                    items.push(new ProductLineItem(products[productID], productID));
                }
            } else {
                throw Error("item not in inventory");
            }
            console.log("new inventory status: " + getInventoryString());
            console.log("new items status: " + items);
            refreshBasketTable();
        },
        removeProduct: function (productID) {
            console.log("removing product with ID: " + productID);
            if (productID < 0 || productID >= products.length) {
                throw Error("wrong product ID");
                return;
            }
            var newItems = [];
            var i;
            var item;
            var removed = false;
            // iterating ProductLineItems
            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item.productID !== productID) {
                    newItems.push(item);
                } else {
                    // not include in new list and update inventory
                    products[productID].inventory += item.quantity;
                    removed = true;
                }
            }
            items = newItems;
            if (!removed) {
                throw Error("Product with id " + productID + " not in basket.");
            }
            console.log("new inventory status: " + getInventoryString());
            refreshBasketTable();
        },
        updateProductQuantity: function (productID, quantity) {
            if (productID < 0 || productID >= products.length) {
                throw Error("wrong product ID");
                return;
            }
            if (quantity <= 0) {
                throw Error("wrong quantity size");
                return;
            }
            var i;
            var ourItem;
            // find our product in ProductLineItems
            for (i = 0; i < items.length; i++) {
                if (items[i].productID === productID) {
                    ourItem = items[i];
                    break;
                }
            }
            if (ourItem !== undefined) {
                if (quantity <= ourItem.quantity) {
                    // safe to change quantity, because decreasing quantity of item in basket
                    products[productID].inventory += ourItem.quantity - quantity;
                    ourItem.quantity = quantity;
                } else {
                    // not safe to increase quantity, check if available
                    if (products[productID].inventory >= quantity -   ourItem.quantity) {
                        products[productID] += quantity - ourItem.quantity;
                        ourItem.quantity = quantity;
                    } else {
                        throw Error("Product with id " + productID + " does not have enough items in inventory. " +
                                "Requested " + (quantity - ourItem.quantity) + " but have available only " + (products[productID].inventory));
                    }
                }
            } else {
                throw Error("Product with id " + productID + " not in basket.");
            }
            refreshBasketTable();
        },
        getTotalPrice: function () {
            var sum = 0;
            var i;
            for (i = 0; i < items.length; i++) {
                sum += items[i].getTotalPrice();
            }
            return sum;
        }
    }
})();

