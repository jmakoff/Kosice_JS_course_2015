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
var basket = null;

class ProductLineItem {
	
	constructor(product){
		this.itemID = -1;
		for (let i = 0; i < products.length; i++) {
			if (product.name == products[i].name) {
				this.itemID = i; //which in products
				break;
			};
		};
		this.itemName = product.name;
		this.itemPrice = product.price;
		this.itemQuantity = 1;
	}
	
	addItems(quantity){
		this.itemQuantity = this.itemQuantity + quantity;
	}
  
  	setItemsQuantity(quantity){
		this.itemQuantity = quantity;
	}
}

class ProductLineItemContainer {
	
	constructor(){
    	
    }
	
	getTotalPrice(orderItems){
		var sumPrice = 0;
		for (let i = 0; i < orderItems.length; i++) {
			sumPrice = sumPrice + orderItems[i].itemPrice*orderItems[i].itemQuantity;
		};
		return sumPrice;
	}
  
	idInMyList(productID, orderItems){
		for (var i = 0; i < orderItems.length; i++) {
			if (orderItems[i].itemID == productID) {
				return i;
			};
		};
		return -1;
	}
}

class Order extends ProductLineItemContainer {
	
	constructor(listOfItems){
      	super();
      	this.orderItems = listOfItems;
	}
	
	setStatus(status) {
		this.status = status;
	}
  
  	getTotalPrice(){
  		return super.getTotalPrice(this.orderItems);
    }
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductLineItemContainer {
	
	constructor(){
		super();
		this.basketItems = [];
	}
	
  	static getBasket(){
		if(basket !== null){
			return basket;
		} else {
			var b = new Basket();
			basket = b;
			return b;
		}
    }
	
	addProduct(productID){
		if (productID < 0) {
			throw Error("Too low ID");
		};
		if (productID >= products.length) {
			throw Error("ID greater than number of items");
		};
		if (products[productID].inventory < 1) {
			throw Error("Product sold out yet!");
		};
		products[productID].inventory--;
		var id = super.idInMyList(productID, this.basketItems);
		if (id == -1) {
			this.basketItems.push(new ProductLineItem(products[productID]));
		} else{
			this.basketItems[id].addItems(1);
		};
	}
	removeProduct(productID){
		if (productID < 0) {
			throw Error("Too low ID");
		};
		if (productID >= products.length) {
			throw Error("ID greater than number of items");
		};
		var id = super.idInMyList(productID, this.basketItems);
		if (id == -1) {
			throw Error("You do not have this item yet");
		} else{
			products[productID].inventory += this.basketItems[id].itemQuantity;
			this.basketItems.splice(id, 1);
		};
	}
	updateProductQuantity(productID, quantity) {
		if (productID < 0) {
			throw Error("Too low ID");
		};
		if (productID >= products.length) {
			throw Error("ID greater than number of items");
		};
		if (products[productID].inventory < quantity) {
			throw Error("Product sold out yet!");
		};
		var id = super.idInMyList(productID, this.basketItems);
		var amountLeft  = products[productID].inventory;
		if (id == -1) {
			products[productID].inventory = amountLeft - quantity;
			this.basketItems.push(new ProductLineItem(products[productID]));
			this.basketItems[id].setItemsQuantity(quantity);
		} else{
			products[productID].inventory = amountLeft + this.basketItems[id].itemQuantity - quantity;
			this.basketItems[id].setItemsQuantity(quantity);
		};
	}
	
	placeOrder() {
		var order = new Order(this.basketItems);
      	order.setStatus(Order.STATUS_PLACED);
		orders.push(order);
		basket = null;
	}
  
  	getTotalPrice(){
  		return super.getTotalPrice(this.basketItems);
    }
}

Basket.getBasket();
basket.addProduct(0);
basket.addProduct(0);
basket.addProduct(1);
basket.updateProductQuantity(1,3);
console.log(Basket.getBasket());

console.log(basket.getTotalPrice());

basket.placeOrder();
console.log(orders[0].getTotalPrice());


