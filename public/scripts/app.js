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


