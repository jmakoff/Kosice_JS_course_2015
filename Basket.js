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
	this.quantity = 1;
	this.product = product;
	this.price = product.price;
}

ProductLineItem.prototype = {
	getProductID : function(){
		for(var i = 0; i<products.length; i++){
			if(product.name === products[i].name){
				return i;
			} 			
		}
		return -1;
	},

	addQuantity : function(value){
		if(value < product.inventory && value >=0){
			this.quantity += value;
			this.price = this.product.price * this.quantity;
		}
	}
};

var basket = (function(){
	
	var productsInBasket = [];
    
	return {
	
		addProduct : function(productID){
			if(productID < 0 || productID > products.length){
				throw Error("Invalid product ID");
			}
			if(products[productID].inventory === 0) {
				throw Error("Product is sold out");
			} 
			for(var i =0; i<productsInBasket.length; i++){
				if(productsInBasket[i].getProductID === productID){
					productsInBasket[i].addQuantity(1);
				} else {
					productsInBasket.push(new ProductLineItem(products[productID]));
				}
			}	
			products[productID].inventory--;	
		},

		removeProduct : function(productID){
			if(productID < 0 || productID > products.length){
				throw Error("Invalid product ID");
			}
			for(var i =0; i<productsInBasket.length; i++){
				if(productsInBasket[i].getProductID === productID){
					products[productID].inventory += productsInBasket[i].quantity;
					productsInBasket.quantity = 0;
				} else {
					throw Error ("Can't remove this product, you don't have it in your basket");
				}
			}
		},

		updateProductQuantity : function(productID, quantity) {
			if(productID < 0 || productID > products.length){
				throw Error("Invalid product ID");
			}
			if(quantity > products[productID].inventory){
				throw Error("Not enough products in inventory");
			} 
			for(var i = 0; i<productsInBasket.length; i++){
				if(productsInBasket[i].getProductID === productID){
					var quantityAlreadyInBasket = productsInBasket[i].quantity
					productsInBasket[i].addQuantity(quantity-quantityAlreadyInBasket);
					products[productID].inventory -= (quantity - quantityAlreadyInBasket);
				}
				
			
		},

		getTotalPrice : function(){
			var totalPrice = 0;
			for(var i = 0; i<productsInBasket.length; i++){
				totalPrice += productsInBasket[i].price;
			}
			return totalPrice;	
		}
	}
})();
