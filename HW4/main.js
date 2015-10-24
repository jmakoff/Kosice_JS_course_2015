var products = [{
        name : "test",
        price : 10,
        inventory : 20
    }, {
        name : "test2",
        price : 30,
        inventory : 80
    }];
var orders = [];


class ProductLineItem{
  constructor(productID) {
    this.id = productID;
    this.q = 1;
  }  
}

class ProductlineItemContainer {
  	constructor(){
    	this.content = [];  
  	}
	getTotalPrice(){
		var price=0;
        for (let i=0; i<this.content.length; i++){
			price+=(this.content[i].q*products[i].price);
		}
      	console.log("Total price of this order is " + price);
	}
}

class Order extends ProductlineItemContainer {
  	constructor(content){
      	super();
    	  this.content = content;
      	this.status = Order.STATUS_PLACED;
    }
	setStatus(status) {
		switch(status) {
    		case 2:
        		this.status = Order.STATUS_DELIVERED;
        		break;
    		case 3:
        		this.status = Order.STATUS_CANCELED
        		break;
    		default:
        		console.log("Invalid status code");
		}
	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

var myBasket;

class Basket extends ProductlineItemContainer {  
  
  	static getBasket(){
      if (myBasket==null) {
        myBasket = new Basket();
        if (myBasket != null){
          	console.log("Basket created!");
        } else {
          	console.log("Something wrong!");
        }  
      } else {
        return myBasket;
      }
  	}
  
    constructor(){
      super();
      //this.content = [];
    }
  
	addProduct(productID){
		if (productID < products.length && productID>=0) { //existance testing
			if (products[productID].inventory===0){ //amount of product testing
				console.log("SORRY, no more" + products[productID].name);
			} else {
				var test = 0;
			    for (let i=0; i<this.content.length; i++){
			    	if (this.content[i].id===productID){
			        	this.content[i].q++;
			            products[productID].inventory--;
			            test = 1;
			        }
			    }       
			    if (test === 0) {
			    	this.content.push(new ProductLineItem(productID));
			        products[productID].inventory--;
			    }   
			  	console.log("1 piece of " + products[productID].name + " added");
			}
        } else {
        	console.log("SORRY, there is no such product!");
        }
	}
	removeProduct(productID){
		if (this.content[productID].q > 0) {
			var quantity = this.content[productID].q;
            this.content[productID].q = 0;
			products[productID].inventory+=quantity;
			console.log("All pieces of " + products[productID].name + " removed from the basket");
        } else {
			console.log("SORRY, there is nothing to remove");
		}
	}
	updateProductQuantity(productID, quantity) {
		var test = 0;
			for (let i=0; i<this.content.length; i++){
		    	if (this.content[i].id === productID){
		        	if (quantity > this.content[i].q+products[i].inventory){
		            	console.log("SORRY, there are not enough pieces of " + products[productID].name);
		            } else {
		                for (let i=0; i<this.content.length; i++){
		                    if(this.content[i].id===productID){
		                        products[productID].inventory -= (quantity-this.content[i].q);
		                        this.content[i].q=quantity;
		                        console.log("Amount of " + products[productID].name + " increasd to " + this.content[i].q);
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
			        this.content.push(new ProductLineItem(productID));
			        for (let i=0; i<content.length; i++){
			            if (this.content[i].id===productID){
			                this.content[i].q=quantity;
			            }
			        }
			        console.log("amount of " + products[productID].name + " increasd to " + content[productID].q);
			    }
			}
	}
	
	placeOrder() {
		orders.push(new Order(this.content));
      	console.log("New order has been placed!")
    	myBasket = null;      	
	}
}

console.log(myBasket==null);
Basket.getBasket();
myBasket.addProduct(1);
myBasket.getTotalPrice();
myBasket.updateProductQuantity(1, 5);
myBasket.getTotalPrice();
myBasket.addProduct(0);
myBasket.getTotalPrice();
myBasket.removeProduct(1);
myBasket.getTotalPrice();
myBasket.placeOrder();
orders[0].getTotalPrice();