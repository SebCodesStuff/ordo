$(() => {

// Show user login form
  $(".login-btn").on('click', function(){
    $(".login-form").addClass('show');
    $(".login-form .close").on('click', function(){
        $('.login-form').removeClass('show');
    });
  });

  // Show user registration
  $(".register-btn").on('click', function(){
    $(".registration-form").addClass('show');
    $(".registration-form .close").on('click', function(){
        $('.registration-form').removeClass('show');
    });
  });

  // Frontpage effect: shrink lead image after scrolling past its length

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 325) {
      $("#front-nav").addClass('show');
      $("#map").addClass('map-padding');
    }
    else {
      $("#front-nav").removeClass('show');
      $("#map").removeClass('map-padding');
    }
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 380) {
      $(".fixed-name").addClass('show');
    }
    else {
      $(".fixed-name").removeClass('show');
    }
  });


// FRONT MAP
  // $(window).scroll(function() {
  //   var scroll = $(window).scrollTop();
  //   if (scroll >= 325) {
  //     $("#map").addClass('map-padding');
  //   } else {
  //     $("#map").removeClass('map-padding');
  //   }
  // });
  // Frontpage effect: shrink lead image after scrolling past its length

    $('.insertLineItem').submit(function(event){
      event.preventDefault();
      var lineitemData = $(this).serialize()
      $.post("/restaurant/new/lineitem", lineitemData)
    });

});
