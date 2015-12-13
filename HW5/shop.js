"use strict";
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
    }],
    orders = [];


class ProductLineItem {
    constructor(productID) {
        this.product = products[productID];
        this.qty = 1;
    }

    //updateQty(qty) {
    //    this.qty = qty;
    //    this.total = this.product.price * qty;
    //}

    getTotal() {
        this.total = this.qty * this.product.price;
        return this.total;
    }
}

class ProductlineItemContainer {
    constructor() {
        this.productLineItems = [];
    }

    getTotalPrice() {
        var sum = 0;
        for (let i = 0; i < this.productLineItems.length; i++) {
            sum += this.productLineItems[i].getTotal();
        }
        //console.log("computing total sum: "+ sum+" items: "+this.productLineItems.length);
        return sum;
    }
}

class Order extends ProductlineItemContainer {

    setItems(basket) {
        //console.log("setting items from basket: "+JSON.stringify(basket));
        this.productLineItems = basket.productLineItems;
        this.totalPrice = basket.totalPrice;
    }

    setStatus(status) {
        this.status = status;
    }
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductlineItemContainer {
    addProduct(productID) {
        //this.productLineItems.push(new ProductLineItem(productID))
        //this.totalPrice=this.getTotalPrice();
        //console.log("adding product with ID: " + productID);
        if (productID < 0 || productID >= products.length) {
            throw Error("wrong product ID");
        }
        var item = products[productID];
        //console.log("product found, adding: " + item.name + "," + item.price + "," + item.inventory);
        if (item.inventory > 0) {
            item.inventory--;
            var itemIsInBasket = false;
            for (var i = 0; i < this.productLineItems.length; i++) {
                var basketItem = this.productLineItems[i];
                if (basketItem.product.id == productID) {
                    basketItem.qty++;
                    this.totalPrice = this.getTotalPrice();
                    //console.log("item already in basket, incrementing quantity");
                    itemIsInBasket = true;
                }
                //console.log(JSON.stringify(basketItem) + " found: " + itemIsInBasket)
            }
            if (!itemIsInBasket) {
                //console.log("item NOT in basket, inserting item");
                this.productLineItems.push(new ProductLineItem(productID));
                this.totalPrice = this.getTotalPrice();
            }
        } else {
            throw Error("item not in inventory");
        }
        return this;
    }

    removeProduct(productID) {
        //for (let i = 0; i < this.productLineItems.length; i++) {
        //    if (this.productLineItems[i].product.id == productID) {
        //        delete this.productLineItems[i];
        //        console.log("product " + data.productID + " removed");
        //        break;
        //        break;
        //    }
        //}
        console.log("removing product with ID: " + productID);
        if (productID < 0 || productID >= products.length) {
            throw Error("wrong product ID");
        }
        var newItems = [];
        var productLineItem;
        var removed = false;
        // iterating ProductListItems
        for (var i = 0; i < this.productLineItems.length; i++) {
            productLineItem = this.productLineItems[i];
            if (productLineItem.product.id !== productID) {
                newItems.push(productLineItem);
            } else {
                // not include in new list and update inventory
                products[productID].inventory += productLineItem.qty;
                removed = true;
                console.log("product " + productID + " removed ");
            }
        }
        this.productLineItems = newItems;
        if (!removed) {
            throw Error("Product with id " + productID + " not in basket.");
        }
        this.totalPrice = this.getTotalPrice();
        return this;
    }

    decrementProduct(productID) {
        //console.log('looking for product: ' + productID + " in " + JSON.stringify(this));
        for (let i = 0; i < this.productLineItems.length; i++) {
            if (this.productLineItems[i].product.id == productID) {
                var count = this.productLineItems[i].qty - 1;
                this.updateProductQuantity(productID, count);
                console.log("product " + productID + " decremented to " + count);
                break;
            }
        }
        return this;
    }

    updateProductQuantity(productID, quantity) {
        //for (let i = 0; i < this.productLineItems.length; i++) {
        //    if (this.productLineItems[i].product.id == productID) {
        //        this.productLineItems[i].updateQty(qty);
        //        if (this.productLineItems[i].qty == 0) {
        //            delete this.productLineItems[i];
        //            console.log("product " + productID + " deleted ");
        //            break;
        //        }
        //    }
        //}
        if (productID < 0 || productID >= products.length) {
            throw Error("wrong product ID");
        }
        if (quantity < 0) {
            throw Error("wrong quantity size");
        }
        var ourProductLineItem;
        // find our product in ProductListItems
        for (var i = 0; i < this.productLineItems.length; i++) {
            if (this.productLineItems[i].product.id === productID) {
                ourProductLineItem = this.productLineItems[i];
                break;
            }
        }
        if (ourProductLineItem !== undefined) {
            if (quantity <= ourProductLineItem.qty) {
                // safe to change quantity, because decreasing quantity of item in basket
                products[productID].inventory += ourProductLineItem.qty - quantity;
                ourProductLineItem.qty = quantity;
                if (ourProductLineItem.qty == 0) {
                    this.removeProduct(productID);
                    //console.log("product " + productID + " deleted ");
                }
            } else {
                // not safe to increase quantity, check if available
                if (products[productID].inventory >= quantity - ourProductLineItem.qty) {
                    products[productID] += quantity - ourProductLineItem.qty;
                    ourProductLineItem.qty = quantity;
                    console.log("product " + productID + " qty changed ");
                } else {
                    // TODO: alert client that more product items not available
                    throw Error("Product with id " + productID + " does not have enough items in inventory. " +
                        "Requested " + (quantity - ourProductLineItem.qty) + " but have available only " + (products[productID].inventory));
                }
            }
        } else {
            throw Error("Product with id " + productID + " not in basket.");
        }
        this.totalPrice = this.getTotalPrice();
        return this;
    }

    placeOrder() {
        //console.log("stringify basket: "+JSON.stringify(this));
        var order = new Order();
        //console.log("created order: "+JSON.stringify(order));
        order.setItems(this);
        //delete this;
        this.productLineItems = [];
        this.totalPrice = 0;
        orders.push(order);
        //console.log("pushed order: "+JSON.stringify(order));
        return order;
    }
}

module.exports = {
    Basket: Basket,
    Order: Order,
    products: products,
    orders: orders
};