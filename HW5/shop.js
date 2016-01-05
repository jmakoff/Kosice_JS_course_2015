"use strict"
var products = [{
        name : "test",
        price : 12.9,
        inventory : 20
    }, {
        name : "test2",
        price : 30,
        inventory : 80
    }],
   orders = [];


class ProductLineItem {
	constructor(productID){
		this.product = products[productID];
		this.qty = 1;
		this.total = this.product.price;
	}
	updateQty(qty) {
		this.qty = qty;
		this.total = this.product.price * qty;
	}
	getID() {
		for (var i = 0; i < products.length; i++) {
			if (this.product.name == products[i].name) {
				return i;
			}
		}
		return -1;
	}
}

class ProductlineItemContainer {
	constructor(){
		this.productLineItems = [];
	}

	static getIDbyName(name) {
		for (var i = 0; i < products.length; i++) {
			if (name == products[i].name) {
				return i;
			}
		}
		return -1;
	}

	findProductID(productID) {
		for (var i = 0; i < this.productLineItems.length; i++) {
			if (productID == this.productLineItems[i].getID()) {
				return i;
			}
		}
		return -1;
	}
	getTotalPrice(){
		var sum = 0;
		for(let i = 0; i < this.productLineItems.length; i++) {
			sum += this.productLineItems[i].total;
		}
		return sum;
	}
}

class Order extends ProductlineItemContainer {
	constructor(basket) {
		super();
		this.productLineItems = basket.productLineItems;
	}
	setStatus(status) {
		this.status = status;
	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductlineItemContainer {
	addProduct(productID){
		if (productID >= products.length || productID < 0) {
			throw Error("ProductID is not valid.");
		}
		if (products[productID].inventory === 0) {
			throw Error("Product is out of stock.");
		}
					
		products[productID].inventory--;

		var IDInBasket = this.findProductID(productID);
		if (IDInBasket == -1) {
			var item = new ProductLineItem(productID);
			this.productLineItems.push(item);
		} else {
			this.productLineItems[IDInBasket].qty++;
			this.productLineItems[IDInBasket].total += products[productID].price;
		}

		return this;
	}
	removeProduct(productID){
		var IDInBasket = this.findProductID(productID);
		if (IDInBasket == -1) {
			throw Error("The product is not in the basket.");
		} else {
			var quantity = this.productLineItems[IDInBasket].qty;
			this.productLineItems.splice(IDInBasket, 1);
			products[productID].inventory += quantity;
		}
		return this;
	}
	updateProductQuantity(productID, qty) {
		if (productID >= products.length || productID < 0) {
			throw Error("ProductID is not valid.");
		}
		if (qty < 0) {
			throw Error("Invalid quantity parameter.");
		}
			
		var IDInBasket = this.findProductID(productID);
		if (IDInBasket == -1) {
			if (products[productID].inventory < qty) {
				throw Error("There is not enough of this product in the inventory.");
			}
			this.addProduct(productID);
			this.updateProductQuantity(qty - 1);
		} else {
			var adding = qty - this.productLineItems[IDInBasket].qty;
			if (adding > 0 && products[productID].inventory < adding) {
				throw Error("There is not enough of this product in the inventory.");
			}
			this.productLineItems[IDInBasket].updateQty(qty);
			products[productID].inventory -= adding;
		}
	}
	
	placeOrder() {
		var order = new Order(this);
		delete this;
		orders.push(order);
		return order;
	}
}

module.exports = {
	Basket : Basket,
	products : products,
	orders : orders
}
