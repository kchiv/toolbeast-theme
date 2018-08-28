// Search bar close
$(".openBtn").click(function(){
    $("#myOverlay").fadeIn();
});

// Search bar close
$(".closebtn").click(function(){
    $("#myOverlay").fadeOut()
});



// Top nav drop down transition

$('.dropdown-toggle').click(function () {
    $(this).next('.dropdown-menu').slideToggle(300);
});

$('.dropdown-toggle').focusout(function () {
    $(this).next('.dropdown-menu').slideUp(300);
})