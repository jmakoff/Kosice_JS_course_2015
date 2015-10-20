
var toggleListener = function(e) 
    { 
     e.stopPropagation();
     if(e.target != this) return;
     $(this).children().toggle();
    };

var addListener = function(e) 
    { 
        //e.stopPropagation();
        var newObj = $( "<input></input>" );
        var oldObj = $(this); //span+ here
        oldObj.replaceWith(newObj);
        $('input').on("keypress", function(e) {
            /* ENTER PRESSED*/
            if (e.keyCode == 13) {
                var newListName = e.target.value;
                console.log(newListName);
                newObj.replaceWith(oldObj);//span+ is back
                
                //add new list 
                $newList = $("<ul><li>"+newListName+"<span>+</span></li></ul>");
                oldObj.append($newList);

                //listeners
                $('ul.myList li').off('click');
                $('ul.myList li').on('click',toggleListener);
                $('ul.myList span').off('click');
                $('ul.myList span').on('click',addListener);
                
            }
        });
    };


$(document).ready(function() 
 {
    $('ul.myList li').on('click',toggleListener);

    $('ul.myList span').on('click',addListener);

 });
