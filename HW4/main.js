var prodcuts = [{
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
	//implement
}

class ProductlineItemContainer {
	//implement
	getTotalPrice(){
		//implement
	}
}

class Order extends ProductlineItemContainer {
	//implement
	setStatus() {
		//implement
	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductlineItemContainer {
  	static getBasket(){
		//implement
    }
	addProduct(productID){
		//implement
	}
	removeProduct(productID){
		//implement
	}
	updateProductQuantity(productID, quantity) {
		//implement
	}
	
	placeOrder() {
		//implement
	}
}
console.log(Basket)