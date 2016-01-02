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
	constructor(product) {
		this.name = product.name;
		this.quantity = 1;
	}

	getID() {
		for (var i = 0; i < products.length; i++) {
			if (this.name == products[i].name) {
				return i;
			}
		}
		return -1;
	}
}

class ProductlineItemContainer {
	constructor() {
		this.content = [];
	}

	findProductID(productID) {
		for (var i = 0; i < this.content.length; i++) {
			if (productID == this.content[i].getID()) {
				return i;
			}
		}
		return -1;
	}

	getTotalPrice(){
		var totalPrice = 0;
		for (var i = 0; i < this.content.length; i++) {
			var productID = this.content[i].getID();
			totalPrice += this.content[i].quantity * products[productID].price;
		}
		return totalPrice;
	}
}

class Order extends ProductlineItemContainer {
	constructor(content) {
		super();
		this.content = content;
		this.setStatus(Order.STATUS_PLACED);
	}

	setStatus(status) {
		this.status = status;
	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

var basket = null;

class Basket extends ProductlineItemContainer {	
	constructor() {
		super();
	}

  	static getBasket(){
		if (basket == null) {			
			basket = new Basket();
			console.log("Basket created.");
		}

		return basket;
    	}

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
			var item = new ProductLineItem(products[productID]);
			this.content.push(item);
		} else {
			this.content[IDInBasket].quantity++;				
		}
	}
	removeProduct(productID){
		var IDInBasket = this.findProductID(productID);
		if (IDInBasket == -1) {
			throw Error("The product is not in the basket.");
		} else {
			var quantity = this.content[IDInBasket].quantity;
			this.content[IDInBasket].quantity = 0;
			products[productID].inventory += quantity;
		}
	}
	updateProductQuantity(productID, quantity) {
		if (productID >= products.length || productID < 0) {
			throw Error("ProductID is not valid.");
		}
		if (quantity < 0) {
			throw Error("Invalid quantity parameter.");
		}
			
		var IDInBasket = this.findProductID(productID);
		if (IDInBasket == -1) {
			if (products[productID].inventory < quantity) {
				throw Error("There is not enough of this product in the inventory.");
			}
			this.addProduct(productID);
			this.updateProductQuantity(quantity - 1);
		} else {
			var adding = quantity - this.content[IDInBasket].quantity;
			if (adding > 0 && products[productID].inventory < adding) {
				throw Error("There is not enough of this product in the inventory.");
			}
			this.content[IDInBasket].quantity += adding;
			products[productID].inventory -= adding;
		}
	}
	
	placeOrder() {
		var order = new Order(this.content);
		orders.push(order);
		basket = null;
	}
}
console.log(Basket)
var myBasket = Basket.getBasket();
myBasket.addProduct(0);
myBasket.addProduct(1);
console.log(myBasket.getTotalPrice());
myBasket.updateProductQuantity(1, 3);
console.log(myBasket.getTotalPrice());
myBasket.removeProduct(0);
console.log(myBasket.getTotalPrice());
myBasket.placeOrder();
console.log(orders[0].getTotalPrice());
console.log(orders[0].status);
