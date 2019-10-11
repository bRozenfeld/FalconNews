document.addEventListener("DOMContentLoaded", function() {
  console.log("create-feeder.js load");

  var url = document.getElementById('url');

  url.addEventListener('change', function(e) {
    var val = url.value;
  });
});


function addFeeder() {
  console.log("entering addFeeder() method -> URL value: " + url.value);
  var urlDest = "http://localhost/FalconNews/api/feeders/create.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
    } else {
      console.log(request.responseText);
    }
  };
  request.send(JSON.stringify({
    url: url.value
  }));
};
