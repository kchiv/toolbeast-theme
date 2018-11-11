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


// Collection sorting
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


// Smooth scroll to anchor point
// Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });



// Quantity selector on PD pages
    $(document).on('click', '.number-spinner button', function () {    
      var btn = $(this),
        oldValue = btn.closest('.number-spinner').find('input').val().trim(),
        newVal = 0;
      
      if (btn.attr('data-dir') == 'up') {
        newVal = parseInt(oldValue) + 1;
      } else {
        if (oldValue > 1) {
          newVal = parseInt(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      btn.closest('.number-spinner').find('input').val(newVal);
    });


// PD page image slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true
    });



// Variant drop down appends URL parameter
// and changes product values in DOM
    function getVariantFromOptions() {
      let variantArr = []
      $(".product-category select").map(function(i, el) {
        variant = {value: $(el).val(), index: $(el).data('index')};
        variantArr.push(variant)
      });
      return variantArr;
    }

    function updateHistoryState(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;
      
      window.history.replaceState({ path: newurl }, '', newurl);
    }

    $('.product-category select').on('change', function() {
      var selectedValues = getVariantFromOptions();
      var variants = window.product.variants;
      
      // Search for product variants based on what was selected in the dropdowns
      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });
      updateHistoryState(found)
      var oldMoney = found.price.toString();
      var newMoney = "$" + oldMoney.slice(0, -2) +"."+oldMoney.slice(-2);
      $('#variant-id').val(found.id)
      // Update price value
      $('.pd-pg-price').text(newMoney)
      // Update SKU value
      $('.variant-sku').text(found.sku)
      // Update selected image
      if (found.featured_image !== null) {
        $('.slider-for').slick('slickGoTo',found.featured_image.position - 1);
      }
    });



// Form toggle for sign in and forgot password form
    $("#fgtPwd").click(function(){
      $("#recovPwdForm").show();
      $("#returnCustForm").hide();
    });

    $("#signInBack").click(function(){
      $("#returnCustForm").show();
      $("#recovPwdForm").hide();
    });

    function hash(th) {
        var wh = window.location.hash;
        if (!wh) { wh = th; }//set to href if !hash
        if(wh==='#recover') {//if hash ===
              $("#recovPwdForm").show();
              $("#returnCustForm").hide();
        }
    }
    hash();//inital run