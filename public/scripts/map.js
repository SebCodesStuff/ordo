

function initMap() {
        // var address = ['20 Dundas St W, Toronto, ON M5G 2C2', `469 King St W, Toronto, ON M5V 1K4`, '515 Jarvis St, Toronto, ON M4Y 2H7', '421 Dundas St W, Toronto, ON M5T 2W4'];


        var center = {lat: 43.6629, lng: -79.3957};
        var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 12,
                  center: center
                });

        $(() => {
            $.ajax({
                method: "GET",
                   url: "/api/map"
            }).done((restaurant) => {

                var geocoder = new google.maps.Geocoder();

                for(let i=0; i<restaurant.length; i++) {

                    console.log(restaurant[i].address);
                    var geocoder = new google.maps.Geocoder();

                    geocoder.geocode( { 'address': restaurant[i].address}, function(results, status) {

                      if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results[0]);
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        var uluru = {lat: latitude, lng: longitude};
                        var marker = new google.maps.Marker({
                            position: uluru,
                            map: map,
                            label:`${i+1}`
                          });
                      }
                    })

                }
            });
          });

  }
