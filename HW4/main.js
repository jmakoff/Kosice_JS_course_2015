var products = [{
	name : "pivo",
	price : 1.8,
	inventory : 50
}, {
	name : "klobasa",
	price : 2.3,
	inventory : 20
}],
	orders = [],
	NotInContent = -1,
	UndefinedID = -2;

class ProductLineItem {
	constructor(product) {
		this.name = product.name;
		this.amount = 0;
		this.id = UndefinedID;
	}
}

class ProductLineItemContainer {
	constructor(){
		this.content = [];
	}
	
	getTotalPrice(){
		var total = 0;
		for(var i=0; i<content.length; i++){
			total += content[i].amount*products[content[i].id].price;
		}
		return total;
	}
}

class Order extends ProductLineItemContainer {
	constructor() {
		super();
	}
	
	setStatus(status) {
		this.status = status;
	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductLineItemContainer {
	var instance = null;
	
	constructor() {
		super();
	}
	
  	static getBasket(){
		if(!instance){
			instance = new Basket();
		}
		return instance;
    }
	
	getId productID) {
		for(var i=0; i<content.length; i++){
			if(content[i].id == productID){
				return i;
			}
		}
		return NotInContent;
	}
	
	addProduct(productID){
		if(productID < 0 || products.length <= productID){
			throw Error("Not valid product!");
		}
		if(products[productID].inventory == 0){
			throw Error("Ran out of this product!");
		}
		var index = this.getId(productID);
		if(index == NotInContent){
			var product = new ProductLineItem(products[productID]);
			product.id = productID;
			content.push(product);
			index = this.getId(productID);
		}
		content[index].amount++;
		products[productID].inventory--;
	}
	
	removeProduct(productID){
		var index = this.getId(productID);
		if(index == NotInContent || content[index].amount == 0){
			throw Error("You don't have this product!");
		}
		products[productID].inventory += content[index].amount;
		content[index].amount = 0;
	}
	
	updateProductQuantity(productID, quantity) {
		if(productID < 0 || products.length <= productID){
			throw Error("Not valid product!");
		}			
		var index = this.getId(productID);
		if(index == NotInContent){
			this.addProduct(productID);
			index = this.getId(productID);
		}
		var diff = quantity - content[index].amount;
		if(quantity < 0 || products[productID].inventory-diff < 0){
			throw Error("Invalid amount of product!");
		}
		products[productID].inventory -= diff;
		content[index].amount += diff;
	}
	
	placeOrder() {
		var order = new Order();
		order.content = this.content;
		order.setStatus(Order.STATUS_PLACED);
		orders.push(order);
		instance = null;
	}
	
}
console.log(Basket)