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
	//implemented
	for (var i = 0; i < products.length; i++) {
		if (product.name == products[i].name) {
			this.itemID = i; //which in products
			break;
		};
	};
	this.itemName = product.name;
	this.itemPrice = product.price;
	this.numberOfItems = 1; //when created
}

ProductLineItem.prototype = {
	//implemented
	getNumberOfProducts : function(){
		return this.numberOfItems;
	}
	setNumberOfProducts : function(number){
		this.numberOfItems = number;
	}
	incNumberOfProducts : function(){
		return this.numberOfItems += 1;
	}
	decNumberOfProducts : function(){
		return this.numberOfItems = this.numberOfItems - 1;
	}
	getPrice : function(){
		return this.itemPrice;
	}
	getGroupPrice : function(){ //of all items of this type
		return this.itemPrice*this.numberOfItems;
	}
};

var basket = (function(){
	//implement
	var items = new Array();

	function idInBasket(productID){
		for (var i = 0; i < items.length; i++) {
			if (items[i].itemID == productID) {
				return i;
			};
		};
		return -1;
	}

	return {
		addProduct : function(productID){
			//implemented
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
			var id = idInBasket(productID);
			if (id == -1) {
				items.push(new ProductLineItem(products[productID]));
			} else{
				items[id].incNumberOfProducts();
			};
		},
		removeProduct : function(productID){
			//implemented
			if (productID < 0) {
				throw Error("Too low ID");
			};
			if (productID >= products.length) {
				throw Error("ID greater than number of items");
			};
			var id = idInBasket(productID);
			if (id == -1) {
				throw Error("You do not have this item yet");
			} else{
				products[productID].inventory += items[id].getNumberOfProducts;
				items.splice(id, 1);
			};
		},
		updateProductQuantity : function(productID, quantity) {
			//implemented
			if (productID < 0) {
				throw Error("Too low ID");
			};
			if (productID >= products.length) {
				throw Error("ID greater than number of items");
			};
			if (products[productID].inventory < quantity) {
				throw Error("Not enough of this product in inventory");
			};
			var id = idInBasket(productID);
			var amountLeft  = products[productID].inventory;
			if (id == -1) {
				products[productID].inventory = amountLeft - quantity;
				items.push(products[productID]);
				items[id].setNumberOfProducts(quantity);
			} else{
				products[productID].inventory = amountLeft + (items[id].getNumberOfProducts - quantity);
				items[id].setNumberOfProducts(quantity);
			};
		},
		getTotalPrice : function(){
			//implemented
			var total = 0;
			for (var i = 0; i < items.length; i++) {
				total += items[i].getGroupPrice;
			};
			return total;
		}
	}
})();

addProduct(0);
addProduct(0);
addProduct(0);
addProduct(1);
addProduct(1);
removeProduct(0);
updateProductQuantity(0,2);
getTotalPrice();
