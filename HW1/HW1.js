var products = [{
	name : "test",
	price : 12.9,
	inventory : 20
}, {
	name : "test2",
	price : 30,
	inventory : 80
}];

function ProductLineItem(product, id) {
	this.product = product;
	this.quantity = 1;
    this.productId = id;
    this.price = product.price;
}

ProductLineItem.prototype = {
	
};
var basket = (function(){

	var myProducts = [];
	return {
		addProduct : function(productID){
			// find out if we already have this product
			var index = -1;
			if ((productID > -1) && (productID < products.length) ) {
				for (var i = 0; i < myProducts.length; i++) {
					if(myProducts[i].productId == productID){
						index = productID;
					}
				}
				if(index>-1){
					myProducts[index].quantity++;
				}else{
					var product = new ProductLineItem(products[productID], productID);
					myProducts.push(product);
				}
				products[productID].quantity--;
    			console.log("product added");
			} else {
				console.log("wrong ID");
			}
		},
		removeProduct : function(productID){
			if (myProducts.length>0 && (productID > -1) && (productID < myProducts.length) ) {
    			products[productID].quantity++;
    			if(myProducts[productID].quantity>1){
    				myProducts[productID].quantity--;
    			}else{
    				myProducts.splice(productID, 1);	
    			}
			} else {
				console.log("wrong ID");
			}
		},
		updateProductQuantity : function(productID, quantity) {
			if (products.length>0 && (productID > -1) && (productID < products.length) ) {
    			products[productID].inventory = quantity;
    			console.log("product updated");
			} else {
				console.log("wrong ID");
			}
		},
		getTotalPrice : function(){
			var totalPrice = 0;
			for (var i=0; i<myProducts.length; i++)
			{
        		totalPrice += myProducts[i].price;
			}
			return totalPrice;
		},
		getProducts: function () {
            return myProducts;
        },
	}
})();