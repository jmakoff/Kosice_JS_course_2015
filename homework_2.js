$(function() {

 //toggle subItems

      $(".myList").on("click", "li", function(event) {
		event.stopImmediatePropagation();
            	event.preventDefault();
		var subItems = this.children;
		subItems.toggle();
	}	

 //show inputfield after clicking on +
	
	$(".myList").on("click", "span", function(event) {

		var $input = $('<input type="text" />');
		$(this).append($input);
		
	}


//press enter

	$(".myList ul").on("keydown", "input", function(event) {
		 if (event.keyCode == 13) {
			var itemName = $(".myList input").val();
			$newItem = $("<ul><li>"+itemName+"<span>+</span></li></ul>");
			&(this).append($newItem)
		}
	}
})
