$(function () {
    $(document).ready(function () {
        $('ul').on("click", 'li', function (e) {
            event.stopPropagation();
            e.preventDefault();
            if (e.target == this) {
                $(this).children('ul').slideToggle();
                event.stopPropagation();
                e.preventDefault();
            }
            event.stopPropagation();
            e.preventDefault();
        });
        $('li').on('click', 'span', function (e) {
            if (!($($(this).parent().children('ul')).is(":visible"))) {
                $(this).parent().children('ul').slideToggle();
            }
            var spa = e.target;
            var visible = $(e.target).is(":hidden");
            var pom = spa.parentNode;
            if (true === true) {
                event.stopPropagation();
                var spanText = "<span>+</span>";
                var flag = 1;
                spa.style.display = "none";
                input = document.createElement("input");
                spa.parentNode.insertBefore(input, spa);
                input.focus();
                var noOnBlur = 1;
                input.onkeyup = function (e) {
                    if ("13" == e.keyCode) {
                        flag = 2;
                        event.stopPropagation();
                        spa.parentNode.removeChild(input);
                        spa.style.display = "";
                        if ($(pom).children("ul").length) {
                            var pom2 = pom.getElementsByTagName("ul")[0].childNodes[0];
                            var li = document.createElement("LI");
                            var textnode = document.createTextNode(input.value);
                            li.appendChild(textnode);
                            var spnn = document.createElement('span');
                            spnn.textContent = "+";
                            li.appendChild(spnn);
                            pom.getElementsByTagName('ul')[0].appendChild(li);
                        } else {
                            var nestedUl = document.createElement("ul");
                            var nestedLi = nestedUl.appendChild(document.createElement("li"));
                            nestedLi.appendChild(document.createTextNode(input.value));

                            var spnn = document.createElement('span');
                            spnn.textContent = "+";
                            nestedLi.appendChild(spnn);

                            pom.appendChild(nestedUl);
                        }
                    }
                };
                input.onblur = function () {
                    if (flag == 1) {
                        spa.parentNode.removeChild(input);
                        spa.style.display = "";
                    }
                };
            };
        });
    });
});
