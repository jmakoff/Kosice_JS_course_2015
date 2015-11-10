/*
 * Home work details.
 It is committed in our repository you can find it here https://github.com/abyrvalg/Kosice_JS_course_2015/tree/master/HW2-3.
 
 You see a page with a list.
 Your task is writing some JS (you can use jQuery) which makes the page behave next way
 1. When you click on item which contains sub items, sub items should be shown if they were hidden and hidden if the were shown
 2. if you click "+" symbol an input field should be shown instead of +
 3. when you press "Enter" on input field new item should be put under current item, input field should be replace with "+"
 
 Please contact me in case of any questions.
 */

$(document).ready(function () {

    // every li with subitems should be collapsible
    $('#cssmenu > ul > li:has(ul)').addClass("has-sub");
    // add for each ul button for adding new li to that list
    $("#cssmenu ul").each(function (index, element) {
        $(this).append('<li><button class="addBtn">+</button></li>');
    });

    $('#cssmenu > ul > li > a').click(function () {
        console.log(this);
        var checkElement = $(this).next();
        console.log(checkElement);

        /* remove the .active class from all menu items, and then add the .active class to the menu 
         * item that was just clicked. 
         * If you take a look back at the CSS code you will see that the active class controls 
         * whether we show the plus or minus image.*/
        //$('#cssmenu li').removeClass('active');
        $(this).closest('li').addClass('active');

        /* After our .active class checks we have the first if statement. This if statement checks 
         * for two things. First to see if the checkElement variable is a UL, and second to see 
         * whether or not it is visible. If both of these things are true, it means the clicked 
         * menu item has a submenu, and that sub menu is visible. The correct functionality for this 
         * situation is to collapse the sub menu and remove the .active class. */
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }

        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            //$('#cssmenu ul ul:visible').slideUp('normal'); // we dont want other opened submenus to collapse
            checkElement.slideDown('normal');
        }

        if (checkElement.is('ul')) {
            // false means we dont want to follow the link, cancelling default functionality
            return false;
        } else {
            // we want to follow the link
            return true;
        }
    });


    $('#cssmenu > ul > li > ul > li > a').click(function () {
        console.log($(this).toString() + " ul li ul li a remove inputtext");
        replaceInputtexts();
    });
    $('#cssmenu > ul > li > a').click(function () {
        console.log($(this).toString() + " ul li a remove inputtext");
        replaceInputtexts();
    });

    function replaceInputtexts() {
        $("#cssmenu ul").each(function (index, element) {
            $(this).children("li").last().html('<button class="addBtn">+</button>');
            //console.log($(this).children("li").last().text());
        });
    }

//    $("#cssmenu ul").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');

    $('#cssmenu').on('click', '.addBtn', function () {
        // replace button with inputtext
        console.log(this);
        //console.log($(this).parent().parent().text());
        $(this).parent().html('<input type="text" id="inputItem" value="" style="width: 98%">');
    });

    $('#cssmenu').on('keyup', '#inputItem', function (event) {
        console.log(this.value);
        //console.log($(this));
        //console.log('parent children size: '+$(this).parent("ul").children("li").size());
        console.log('parent children size: ' + $(this).parent().parent("ul").children("li").size());
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13' && this.value != "") {
            // enter pressed, if not empty, than create new list item with value from inputtext
            // and add button at the end of list
            var parent = $(this).parent().parent("ul");
            parent.children("li").last().html('<a href="#"><span>' + this.value + '</span></a>');
            console.log(parent.text());
            console.log('parent children size: ' + parent.children("li").size());
            parent.append('<li><button class="addBtn">+</button></li>');
            console.log('parent children size: ' + parent.children("li").size());
        }
    });

});

