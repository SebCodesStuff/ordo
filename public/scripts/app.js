$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});


// Show login form

$(() => {
  $("#show-login").click(function(){
    $("#login-form").fadeOut().toggle();
    $("#login-form .close").click( function(){
      $("#login-form").toggle();
    });
  });
});