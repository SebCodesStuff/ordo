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
  // $(window).scroll(function() {
  //   var scroll = $(window).scrollTop();
  //   if (scroll >= 325) {
  //       $(".front-header").addClass('smaller');
  //       $(".front-header h1").addClass('smaller-h');
  //       $(".front-header p").addClass('smaller-p');
  //   } else {
  //       $(".front-header").removeClass("smaller");
  //       $(".front-header h1").removeClass('smaller-h');
  //       $(".front-header p").removeClass('smaller-p');
  //   }
  // });
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 325) {
        $("#front-nav").addClass('show');
    } else {
      $("#front-nav").removeClass('show');
    }
  });
  

  $(".registration-form form").submit(function(event){
      event.preventDefault();
      const regData = $( this ).serialize()
      $.post("/user/register",regData)
        .done(()=>{
          $('.registration-form').removeClass('show');
          $(".login-form").addClass('show');
          $(".login-form .close").on('click', function(){
            $('.login-form').removeClass('show');
          });
        })
    });

  });

});

