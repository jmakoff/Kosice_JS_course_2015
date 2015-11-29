var products = [{
	name : "test",
	price : 12.9,
	inventory : 20
}, {
	name : "test2",
	price : 30,
	inventory : 80
}];

function ProductLineItem(product) {
	this.itemID = -1;
	for (var i = 0; i < products.length; i++) {
		if (product.name == products[i].name) {
			this.itemID = i; //which in products
			break;
		};
	};
	this.itemName = product.name;
	this.itemPrice = product.price;
}
	
ProductLineItem.prototype = {
	getPrice : function(){
		return this.itemPrice;
	}
};

var basket = (function(){
	var items = new Array();
	var numberOfItems = new Array();

	function idInMyBasket(productID){
		for (var i = 0; i < items.length; i++) {
			if (items[i].itemID == productID) {
				return i;
			};
		};
		return -1;
	}

	return {
		addProduct : function(productID){
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
			var id = idInMyBasket(productID);
			if (id == -1) {
				items.push(new ProductLineItem(products[productID]));
				numberOfItems.push(1);
			} else{
				numberOfItems[id]++;
			};
		},
		removeProduct : function(productID){
			if (productID < 0) {
				throw Error("Too low ID");
			};
			if (productID >= products.length) {
				throw Error("ID greater than number of items");
			};
			var id = idInMyBasket(productID);
			if (id == -1) {
				throw Error("You do not have this item yet");
			} else{
				products[productID].inventory += numberOfItems[id];
				items.splice(id, 1);
				numberOfItems.splice(id,1);
			};
		},
		updateProductQuantity : function(productID, quantity) {
			if (productID < 0) {
				throw Error("Too low ID");
			};
			if (productID >= products.length) {
				throw Error("ID greater than number of items");
			};
			if (products[productID].inventory < quantity) {
				throw Error("Not enough of this product in inventory");
			};
			var id = idInMyBasket(productID);
			var amountLeft  = products[productID].inventory;
			if (id == -1) {
				products[productID].inventory = amountLeft - quantity;
				items.push(products[productID]);
				numberOfItems.push(quantity);
			} else{
				products[productID].inventory = amountLeft + numberOfItems[id] - quantity;
				numberOfItems[id]=quantity;
			};
		},
		getTotalPrice : function(){
			var total = 0;
			for (var i = 0; i < items.length; i++) {
				total = total +  items[i].getPrice*numberOfItems[i];
			};
			return total;
		}
	}
})();

var b = basket;
b.addProduct(0);
b.addProduct(0);
b.addProduct(1);

b.getTotalPrice();