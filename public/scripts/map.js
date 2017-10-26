function initMap() {
        var address = ['20 Dundas St W, Toronto, ON M5G 2C2', `469 King St W, Toronto, ON M5V 1K4`];
        var geocoder = new google.maps.Geocoder();

        var center = {lat: 43.6718, lng: -79.4668};
        var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 12,
                  center: center
                });

        address.forEach((ele, ind)=>{

          geocoder.geocode( { 'address': ele}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
              console.log(results[0]);
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var uluru = {lat: latitude, lng: longitude};
            var marker = new google.maps.Marker({
                  position: uluru,
                  map: map,
                  label:`${ind+1}`
                });
            console.log(ind);
            }
        })


        });
  }
