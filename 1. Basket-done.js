var products = [{
	name : "test0",
	price : 10,
	inventory : 20
}, {
	name : "test1",
	price : 30,
	inventory : 80
}];

function ProductLineItem(product, productID) {
	this.product = product;
    this.id = productID;
    this.q = 1;
}

ProductLineItem.prototype = {
	//implement
};

var basket = (function(){
	
	var content = [];
	
	return {
		addProduct : function(productID){
            if (productID < products.length && productID>=0) { //existance testing
			    if (products[productID].inventory===0){ //amount of product testing
			        console.log("SORRY, no more" + products[productID].name);
			    } else {
			        var test = 0;
			        for (i=0; i<content.length; i++){
			            if (content[i].id===productID){
			                content[i].q++;
			                products[productID].inventory--;
			                test = 1;
			            }
			        }       
			        if (test === 0) {
			            content.push(new ProductLineItem(products[productID], productID));
			            products[productID].inventory--;
			        }   
			    console.log("1 piece of " + products[productID].name + " added");
			    }
            } else {
                console.log("SORRY, there is no such product!");
            }
		},
		removeProduct : function(productID){//amount in basket testing
			if (content[productID].q > 0) {
			    var quantity = content[productID].q;
                content[productID].q = 0;
			    products[productID].inventory+=quantity;
			    console.log("all pieces of " + products[productID].name + " removed from the basket");
			} else {
			    console.log("SORRY, there is nothing to remove");
			}
		},
		updateProductQuantity : function(productID, quantity) {
		    var test = 0;
		    for (i=0; i<content.length; i++){
		        if (content[i].id === productID){
		            if (quantity > content[i].q+products[i].inventory){
		                console.log("SORRY, there are not enough pieces of " + products[productID].name);
		            } else {
		                for (i=0; i<content.length; i++){
		                    if(content[i].id===productID){
		                        products[productID].inventory -= (quantity-content[i].q);
		                        content[i].q=quantity;
		                        console.log("amount of " + products[productID].name + " increasd to " + content[i].q);
		                    }
		                }
		            }
		            test = 1;
		        }
		    }
		    
		    
			if (test===0){
			    if (products[productID].inventory < quantity){
			        console.log("SORRY, there are not enough pieces of " + products[productID].name);    
			    } else {
			        products[productID].inventory-=quantity;
			        content.push(new ProductLineItem(products[productID], productID));
			        for (i=0; i<content.length; i++){
			            if (content[i].id===productID){
			                content[i].q=quantity;
			            }
			        }
			        console.log("amount of " + products[productID].name + " increasd to " + content[productID].q);
			    }
			}   
		},
		getTotalPrice : function(){
		    var price = 0;
			for (i=0; i<content.length; i++){
			    price+=(content[i].q*products[i].price);
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