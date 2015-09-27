var prodcuts = [{
	name : "test",
	price : 12.9,
	inventory : 20
}, {
	name : "test2",
	price : 30,
	inventory : 80
}];

function ProductLineItem(product) {
	//implement
}

ProductLineItem.prototype = {
	//implement
};

var basket = (function(){
	//implement
	return {
		addProduct : function(productID){
			//implement
		},
		removeProduct : function(productID){
			//implement
		},
		updateProductQuantity : function(productID, quantity) {
			//implement
		},
		getTotalPrice : function(){
			//implement
		}
	}
})();
