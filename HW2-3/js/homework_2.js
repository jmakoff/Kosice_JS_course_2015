$(function() {
	// showing input field instead of "+"
	$(".myList").on("click", "span", function(event) {
		this.innerHTML = '<input type="text" name="newItem">';
	});

	// after "Enter" was pressed
	$(".myList ul").on("keydown", "input", function(event) {
		// check, if "Enter" was pressed, "Enter" has value 13
		if (event.which == 13) {
			// get value from input field
			var text = $(".myList input").val();

			var currentTargetParent = $(event.currentTarget).parent()[0];

			// append new item
			$($(currentTargetParent).parent()).parent().append("<li>" + text + "<span>+</span></li>");

			// show "+" instead of input field 
			currentTargetParent.innerHTML = '+';
		}		
	});

	// hiding/showing items
	$(".myList").on("click", "li", function(event) {		
		event.stopImmediatePropagation();
		var children = this.childNodes;
		// go through all childNotes, and if there are some lists, then show (or hide) them
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeName == "UL") {
				// check, if it is hidden
				if (children[i].style.display == "none") {
					// show
					children[i].style.display = "";
				} else {
					// hide
					children[i].style.display = "none";
				}				
			}
		}		
	}); 
})

