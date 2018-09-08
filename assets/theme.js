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




Shopify.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}
$('#sort-by').on('change', function() {
    Shopify.queryParams.sort_by = jQuery(this).val();
    location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
  });