$(function() {
      
	$("#ElementaryContainer").click(function(event){
		$(".Elementary").children().toggle(500);   
    }); 
	
	$("#ObjectContainer").click(function(event){
		$(".Object").children().toggle(500);   
    }); 
	
	$("#ArrayContainer").click(function(event){
		$(".ArrayObject").children().toggle(500);
		if(!$("#ArrayText").is(":hidden")){
			$("#ArrayText").val("");
			$("#ArrayText").toggle(500);
		}else{
			$("#ArrayPlus").toggle(500);
		}
		
    });
	  
	$("#DateContainer").click(function(event){
		$(".DateObject").children().toggle(500); 
		if(!$("#DateText").is(":hidden")){
			$("#DateText").val("");
			$("#DateText").toggle(500);
		}else{
			$("#DatePlus").toggle(500);
		}	
    });

	$("#FunctionContainer").click(function(event){
		$(".FunctionObject").children().toggle(500);
		if(!$("#FunctionText").is(":hidden")){
			$("#FunctionText").val("");
			$("#FunctionText").toggle(500);
		}else{
			$("#FunctionPlus").toggle(500);
		}
    });	
	
	$("#ArrayPlus").click(function(event){
		$("#ArrayPlus").toggle(500);
		$("#ArrayText").toggle(500);
    });
	
	$("#DatePlus").click(function(event){
		$("#DatePlus").toggle(500);
		$("#DateText").toggle(500);
    });
	
	$("#FunctionPlus").click(function(event){
		$("#FunctionPlus").toggle(500);
		$("#FunctionText").toggle(500);		
    });
	
	$(document).keypress(function(e) {
      if(e.which == 13) {
		var text;
		  
        text = $("#ArrayText").val(); 
        if (text != ""){         
			$("#ArrayList").append("<li>"+text+"</li>");
			$("#ArrayText").val("");
			$("#ArrayText").toggle(500);
			$("#ArrayPlus").toggle(500);                        
        }
        
        text = $("#DateText").val();
        if (text != ""){
            $("#DateList").append("<li>"+text+"</li>");
            $("#DateText").val("");
			$("#DateText").toggle(500);
            $("#DatePlus").toggle(500);            
        }

        text = $("#FunctionText").val();
        if (text != ""){
            $("#FunctionList").append("<li>"+text+"</li>");
            $("#FunctionText").val("");
			$("#FunctionText").toggle(500);
            $("#FunctionPlus").toggle(500);            
        }

      }
    });   
	
})

