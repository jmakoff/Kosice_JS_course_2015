var products = [{
	id : 0,
	name : "test",
	price : 12.9,
	inventory : 20
}, {
	id : 1,
	name : "test2",
	price : 30,
	inventory : 80
}, {
	id : 2,
	name : "test2",
	price : 30,
	inventory : 0
}];

function ProductLineItem(product) {
	this.id = product.id;
	this.name = product.name;
	this.price = product.price;
	this.quantity = 1;
}

ProductLineItem.prototype = {
	getPrice : function(){
		return (this.quantity*this.price);
	},
	addQuantity : function(quantity){
		this.quantity += quantity;
	},
	printInfo : function(){
		console.log( "Name: " + this.name + ";ID: " + this.id + ";Price: " + this.price + ";Quantity: " + this.quantity);
	},
	printInfoOfQuantity : function() {
		console.log(this.quantity);
	},
	getID : function() {
		return this.id;
	}
};


//toto je modul, staticky objekt, nelze vytvaret jeho instance.... 
//ma "privatne" lokalne premmenne !! ;)
var basket = (function(){
	var array = [];
	return {
		addProduct : function(productID){
			if (products[productID].inventory > 0){
				var isItThere = 0;
			for (var i=0; i< array.length; i++){
				if (array[i].id == productID){
					array[i].quantity++;
					products[productID].inventory--;
					isItThere = -1;
					break;
				}
			}
			if (isItThere == 0){
			var itemForInsert = new ProductLineItem(products[productID]);
			products[productID].inventory--;
			array.push(itemForInsert);
			}
			}
			else{
				window.alert("No more intems in inventory");
			}
		},
		removeProduct : function(productID){
			
			//not working!! 
			//add error throws
			var test = 0;
			for (key in array){
				if(array[key].id == productID){
					
					products[productID].inventory += array[key].quantity;
					array.splice(key,1);
					test = 1;
				}
				
			}
			if (test == 0){
				window.alert("WRONG INPUT");
			}
			//WHY CANNOT USE???  ------------------->?
			/*for (var i=0; i< array.lenght; i++){
				if (array[i].id == productID){
					console.log("Malo zbehnut?")
					products[productID].inventory += array[i].quantity;
					array.splice(i,1);
					break;
				}
			}*/
		},
		updateProductQuantity : function(productID, quantity) {
			
			//error throws!!
			var test = 0;
			if (products[productID].inventory >= quantity){
			for (key in array){
				if (array[key].getID() == productID){
					array[key].addQuantity(quantity);
					products[productID].inventory -= quantity;
					test = -1;
				}
			}
			if (test == 0 ){
				window.alert("WRONG PRODUCT ID!")
			}
			}
			else {
				window.alert("No enought items in inventory");
			}
		},
		getTotalPrice : function(){
			var total = 0;
			//how to do it nicer?? ------------------->?
			for (key in array){
				total += array[key].getPrice();
			}
			console.log(total);			
		},
		outAllItems : function(){
			for (key in array){
				array[key].printInfo();
			}
		}
	}
})();

//arrayTest[1].getPrice();
basket.addProduct(1);
basket.addProduct(0);
