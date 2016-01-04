$(function() {

	$(".myList span").click( function(event) {	
		$(this).replaceWith("<input type='text' id='inputItem' value='' '>");
	});


		$(".myList li").click( function(event) {	
		event.stopImmediatePropagation();
		var list = this.childNodes;
		for (var i = 0; i < list.length; i++) {
			if (list[i].nodeName == "UL") {	
				if (list[i].style.display == "none") {
					$(list[i]).slideDown();
				} else {
					$(list[i]).slideUp();
				}				
			}
		}		
	}); 


	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	console.log($(":input").parent().parent().val());
	        //$(":input").replaceWith('<ul><li>' . $(":input").val() . '</ul></li>');
	        $(":input").replaceWith('<span>+</span></li><ul><li>'+ $(":input").val() +'</li></ul>');
	    }
});

});

$(document).ready(function(){
	
});



 

/*
 Home work details.
 It is committed in our repository you can find it here https://github.com/abyrvalg/Kosice_JS_course_2015/tree/master/HW2-3.
 
 You see a page with a list.
 Your task is writing some JS (you can use jQuery) which makes the page behave next way
 1. When you click on item which contains sub items, sub items should be shown if they were hidden and hidden if the were shown
 2. if you click "+" symbol an input field should be shown instead of +
 3. when you press "Enter" on input field new item should be put under current item, input field should be replace with "+"
 
 Please contact me in case of any questions.
 */