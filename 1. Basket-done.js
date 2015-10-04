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
	//implement
}

ProductLineItem.prototype = {
	//implement
};

var basket = (function(){
	
	var content = [];
  for (j=0; j<products.length; j++){
    content[j] = 0;
  }//inicialize the basket on the size of products
  //value at the index i is amount of the product at index i in array products
	
	return {
		addProduct : function(productID){
      if (productID < products.length) { //existance testing
			 if (products[productID].inventory===0){ //amount of product testing
			    console.log("SORRY, no more" + products[productID].name);
			 } else {
			    content[productID]++;
			    products[productID].inventory--;
			    console.log("1 piece of " + products[productID].name + " added");
			 }
      } else {
        console.log("SORRY, there is no such product!");
      }
		},
		removeProduct : function(productID){//amount in basket testing
			if (content[productID] > 0) {
			    content[productID]--;
			    products[productID].inventory++;
			    console.log("1 piece of " + products[productID].name + " removed");
			} else {
			    console.log("SORRY, there is nothing to remove");
			}
		},
		updateProductQuantity : function(productID, quantity) {
			if (products[productID].inventory+content[productID]>=quantity){//amount in inventory testing
			    products[productID].inventory-=(quantity-content[productID]);
			    content[productID]+=(quantity-content[productID]);
			    console.log("number of " + products[productID].name + " increased to " + content[productID]);
			} else {
			    console.log("SORRY, there not enough pieces of " + products[productID].name);
			}
		},
		getTotalPrice : function(){
		    var price = 0;
			for (i=0; i<content.length; i++){
			    price+=content[i]*products[i].price;
			}
			console.log("total price in the bascet is "+price);
		}
	}
})();

basket.addProduct(0);
basket.getTotalPrice();
basket.updateProductQuantity(0, 5);
basket.getTotalPrice();
basket.updateProductQuantity(1, 2);
basket.getTotalPrice();
basket.removeProduct(1);
basket.getTotalPrice();
basket.removeProduct(1);
basket.getTotalPrice();
basket.removeProduct(1);
basket.updateProductQuantity(0, 50);