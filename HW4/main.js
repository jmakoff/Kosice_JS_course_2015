

function* f(){
        var basket = new Basket();
        yield 1;
  		iterator = f();
        return basket;
     }

var iterator = f();  

var products = [{
  		id : 0,
        name : "test",
        price : 12.9,
        inventory : 20
    }, {
      	id : 1,
        name : "test2",
        price : 30,
        inventory : 1
    }],
   orders = [];


class ProductLineItem {
  
	constructor (product) {
	this.id = product.id;
	this.name = product.name;
	this.price = product.price;
	this.quantity = 1;
	}
  
  	getPrice(){
   	return (this.quantity*this.price); 
  	}
  
	addQuantity(quantity){
	this.quantity += quantity;
	}

printInfo(){
  console.log( "Name: " + this.name + ";ID: " + this.id + ";Price: " + this.price + ";Quantity: " + this.quantity);
}
  printInfoOfQuantity(){
    console.log(this.quantity);
  }
  
  getID(){
   return this.id;
  }
}

class ProductlineItemContainer {
	constructor () {
	this.array = [];
	}  
//  add(item){
 //   
//	this.array.push(item);
//  }
  outAllItems(){
  for (let key in this.array){
				this.array[key].printInfo();
			}
  }
	getTotalPrice(){
		var total = 0;
			//how to do it nicer?? ------------------->?
			for (let key in this.array){
              //TODO SOMETHINK!!!!!!!!!!!!!!!!!!!!!!! .price or 
				total += this.array[key].getPrice();
			}
			console.log(total);		
	}
}

class Order extends ProductlineItemContainer {
  constructor(basket){
    super();
    this.array = basket.array;
    basket.array = [];
  	this.status = Order.STATUS_PLACED;
  }
	setStatus(status) {
		this.status = status;
	}
  getStatus(){
    return this.status;
  	}
}

Order.STATUS_PLACED = "placed";
Order.STATUS_DELIVERED = "delivered";
Order.STATUS_CANCELED = "cancelled";

class Basket extends ProductlineItemContainer {
  	static getBasket(){
		return iterator.next().value;
    }
  	constructor () {
	super();
	}  
	addProduct(productID){
		if (products[productID].inventory > 0){
				var isItThere = 0;
			for (var i=0; i< this.array.length; i++){
				if (this.array[i].id == productID){
					this.array[i].quantity++;
					products[productID].inventory--;
					isItThere = -1;
					break;
				}
			}
			if (isItThere === 0){
			var itemForInsert = new ProductLineItem(products[productID]);
			products[productID].inventory--;
			this.array.push(itemForInsert);
			}
			}
			else{
				window.alert("No more intems in inventory");
			}
	}
	removeProduct(productID){
		var test = 0;
			for (let key in this.array){
				if(this.array[key].id == productID){
					
					products[productID].inventory += this.array[key].quantity;
					this.array.splice(key,1);
					test = 1;
				}
				
			}
			if (test === 0){
				window.alert("WRONG INPUT");
			}
	}
	updateProductQuantity(productID, quantity2) {
		var test = 0;
		var indexOf;
        if (products.length <= productID){
            window.alert("WRONG PRODUCT ID!");
        }
        else {
                        for (let key in this.array){
            if (this.array[key].getID() == productID){
                indexOf = key;
            }   
                        }
            var quantity = quantity2 - this.array[indexOf].quantity;
        if (products[productID].inventory >= quantity && quantity2 >= 0 ){
        for (let key in this.array){
            if (this.array[key].getID() == productID){
                this.array[key].addQuantity(quantity);
                products[productID].inventory -= quantity;
                test = -1;
            }
        }
        if (test === 0 ){
            window.alert("WRONG PRODUCT ID!");
        }
        }
        else {
            if (quantity2 < 0) {
            window.alert("quantity is < 0!!");
            }
            else
            window.alert("No enought items in inventory");

        }
        }
	}
	
	placeOrder() {
		return new Order(this);
	}

}/*
console.log("starting");
var a = new Basket();
a.addProduct(1);
a.addProduct(0);
a.addProduct(0);
console.log("Adding completed");
a.outAllItems();
console.log("PrintAllItems completed");
console.log("removeProduct started");
a.removeProduct(0);
a.outAllItems();
console.log("removeProduct completed");
console.log("Adding started");
a.addProduct(0);
a.addProduct(0);
a.outAllItems();
console.log("Adding completed");
console.log("updateProductQuantity started");
a.updateProductQuantity(1,0);
a.outAllItems();
console.log("updateProductQuantity completedfff");*/
Basket.getBasket();
var bsk = Basket.getBasket();
bsk.addProduct(1);
bsk.addProduct(1);
bsk.addProduct(0);
bsk.addProduct(0);
bsk.outAllItems();
var order = bsk.placeOrder();
console.log("printing empty? started");
bsk.outAllItems();
console.log("printing empty? stopped");
order.outAllItems();
console.log(order.getTotalPrice());
console.log(Order.STATUS_DELIVERED);
console.log(order.getStatus());
console.log(order.setStatus(Order.STATUS_DELIVERED));
console.log(order.getStatus());
