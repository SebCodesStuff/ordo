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
  $(".login-btn").click(function(){
    $("#login-form").fadeOut().toggle();
    $("#login-form .close").click( function(){
      $("#login-form").toggle();
    });
  });

  // Show user registration
  $(".register-btn").click(function(){
    $("#registration-form").fadeOut().toggle();
    $("#registration-form .close").click( function(){
      $("#registration-form").toggle();
    });
  });




});