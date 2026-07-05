$("button").on("click", function() {
    if ($("h1").css("margin-left") == "0px") {
        $("h1").animate({marginLeft: "50px"});
    }
    else {
        $("h1").animatdocument.querySelectorAll("button").forEach(function(button) {
    button.addEventListener("click", function() {
        var h1 = document.querySelector("h1");
        var currentMargin = getComputedStyle(h1).marginLeft;

        if (currentMargin === "0px") {
            h1.style.marginLeft = "50px";
        } else {
            h1.style.marginLeft = "0px";
        }
    });
});e({marginLeft: "0px"});
    }
})