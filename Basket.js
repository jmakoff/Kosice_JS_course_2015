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
	this.name = product.name;
	this.quantity = 1;
}

ProductLineItem.prototype = {
	getID : function() {
		for (var i = 0; i < products.length; i++) {
			if (this.name == products[i].name) {
				return i;
			}
		}
		return -1;
	}	
};

var basket = (function(){
	var productsInBasket = [];		

	return {
		findProductIDInBasket : function(productID) {
			for (var i = 0; i < productsInBasket.length; i++) {
				if (productID == productsInBasket[i].getID()) {
					return i;
				}
			}
			return -1;
		},		
		addProduct : function(productID){
			if (productID >= products.length || productID < 0) {
				throw Error("ProductID is not valid.");
			}
			if (products[productID].inventory == 0) {
				throw Error("Product is out of stock.");
			}
						
			products[productID].inventory--;

			var IDInBasket = this.findProductIDInBasket(productID);
			if (IDInBasket == -1) {
				var item = new ProductLineItem(products[productID]);
				productsInBasket.push(item);
			} else {
				productsInBasket[IDInBasket].quantity++;				
			}
		},
		removeProduct : function(productID){
			var IDInBasket = this.findProductIDInBasket(productID);
			if (IDInBasket == -1) {
				throw Error("The product is not in the basket.");
			} else {
				var quantity = productsInBasket[IDInBasket].quantity;
				productsInBasket[IDInBasket].quantity = 0;
				products[productID].inventory += quantity;
			}	
		},
		updateProductQuantity : function(productID, quantity) {
			if (productID >= products.length || productID < 0) {
				throw Error("ProductID is not valid.");
			}
			if (quantity < 0) {
				throw Error("Invalid quantity parameter.");
			}
			
			var IDInBasket = this.findProductIDInBasket(productID);
			if (IDInBasket == -1) {
				if (products[productID].inventory < quantity) {
					throw Error("There is not enough of this product in the inventory.");
				}
				this.addProduct(productID);
				this.updateProductQuantity(quantity - 1);
			} else {
				var adding = quantity - productsInBasket[IDInBasket].quantity;
				if (adding > 0 && products[productID].inventory < adding) {
					throw Error("There is not enough of this product in the inventory.");
				}
				productsInBasket[IDInBasket].quantity += adding;
				products[productID].inventory -= adding;
			}				
		},
		getTotalPrice : function(){
			var totalPrice = 0;
			for (var i = 0; i < productsInBasket.length; i++) {
				var productID = productsInBasket[i].getID();
				totalPrice += productsInBasket[i].quantity * products[productID].price;
			}
			return totalPrice;
		}		
	}
})();
