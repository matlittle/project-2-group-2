var map, infoWindow, contentString, spec_type;

(function($){
  $.fn.leanModal = function(options) {
    if( $('.modal').length > 0 ){
        $('.modal').modal(options);
    }
  };

  $.fn.openModal = function(options) {
    $(this).modal(options);
    $(this).modal('open');
  };

  $.fn.closeModal = function() {
    $(this).modal('close');
  };

  $('.modal-trigger').leanModal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    backdrop: 'static', 
    keyboard: false
  }
)
})(jQuery);

//BEGIN MAP JAVASCRIPT
// Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 9
      });
      infoWindow = new google.maps.InfoWindow;


     //NEED TO GET THIS FROM THE DATABASE????
      let fieldWeWillGetFromQuestions = $("#main-specialty").text();
      showTypeInfo();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(pos);
          let betterDoctor = `https://api.betterdoctor.com/2016-03-01/doctors?query=${fieldWeWillGetFromQuestions}&location=${pos.lat}%2C${pos.lng}%2C%2050&sort=distance-asc&skip=0&limit=10&user_key=f66d8b491789282ebde86658f5bf614f`;

          //THIS IS CURRENTLY NOT ASYNC
          $.ajax({
            url: betterDoctor,
            method: "GET"
          }).done(function (response) {
            var results = response.data;
            (console.log(results));

            for (var i = 0; i < results.length; i++) {
              var marker = new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: { lat: results[i].practices[0].lat, lng: results[i].practices[0].lon }
              });

                let contentString = `<div id="content">
                <div id="siteNotice">
                </div>
                <h5 id="firstHeading" class="firstHeading">${results[i].profile.first_name} ${results[i].profile.last_name}, ${results[i].profile.title}</h5>
                <p>${results[i].specialties[0].name}, ${results[i].specialties[0].description}</p>
                <br><br>
                <div id="bodyContent">
                <p>${results[i].profile.bio}</p>
                <br>
                <p>You can call them at: ${results[i].practices[0].phones[0].number}</p> 
                </div> 
                </div>`;
                console.log(marker.position);

                let infowindow = new google.maps.InfoWindow({
                  content: contentString
                });

                marker.addListener('click', function () {
                  infowindow.open(map, this);
                  console.log(map);
                  console.log(marker);
                });


              }
              function toggleBounce() {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
              }

            });


          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);

    }

    
//END MAP JAVASCRIPT
    

function showTypeInfo() {
  spec_type = $("#main-specialty").text();

  $(`#${spec_type}`).css({'display': 'block'});

}
