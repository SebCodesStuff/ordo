$(() => {

  // default code from lhl
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

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




});