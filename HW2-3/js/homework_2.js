$(function() {
   $("#elementaryHandler").click(function(event){
      $(".Elementary").children().toggle(1000);   
    });  
        
    $("#objectsHandler").click(function(event){
      $(".Objects").children().toggle(1000);      
    });    
    
    $("#arrayAdd").click(function(event){
      $("#arrayAdd").toggle(250);
      $("#arrayAddText").toggle(250);
    });   
    
    $("#dateAdd").click(function(event){
      $("#dateAdd").toggle(250);
      $("#dateAddText").toggle(250);
    });   
    
    $("#functionAdd").click(function(event){
      $("#functionAdd").toggle(250);
      $("#functionAddText").toggle(250);
    });   
  
    
    $(document).keypress(function(e) {
      if(e.which == 13) {
        if(!$("#arrayAddText").is(":hidden")){
          if (!$("#arrayList").length){
            $(".Array").append("<ul id=\"arrayList\"></ul>");  
          }
          var text = $("#arrayAddText").val(); 
          if (text != ""){         
            $("#arrayList").append("<li>"+text+"</li>");
            $("#arrayAddText").val("");
            $("#arrayAdd").toggle(250);
            $("#arrayAddText").toggle(250);                        
          }
        }
        if(!$("#dateAddText").is(":hidden")){
          if (!$("#dateList").length){
            $(".Date").append("<ul id=\"dateList\"></ul>");  
          }
          var text = $("#dateAddText").val();
          if (text != ""){
            $("#dateList").append("<li>"+text+"</li>");
            $("#dateAddText").val("");
            $("#dateAdd").toggle(250);
            $("#dateAddText").toggle(250);            
          }
        }
        if(!$("#functionAddText").is(":hidden")){
          if (!$("#functionList").length){
            $(".Function").append("<ul id=\"functionList\"></ul>");  
          }
          var text = $("#functionAddText").val();
          if (text != ""){
            $("#functionList").append("<li>"+text+"</li>");
            $("#functionAddText").val("");
            $("#functionAdd").toggle(250);
            $("#functionAddText").toggle(250);            
          }
        }
      }
    });           
})

