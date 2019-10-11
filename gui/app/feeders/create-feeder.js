const URLDest = "http://localhost/FalconNews/api/feeders/create.php";


document.addEventListener("DOMContentLoaded", function() {
  console.log("create-feeder.js load");
  var url = document.getElementById('url');

  url.addEventListener('change', function(e) {
    var val = url.value;
  });
});




function addFeeder() {
  console.log("entering addFeeder() method");
  console.log("URL value: " + url.value);

  var request = new XMLHttpRequest();
  request.open("POST", URLDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status === 200 && request.readyState === request.DONE) {
      console.log("ok");
      console.log(request.response);
      var info = JSON.parse(request.responseText);
      console.log(info);
    } else {
      console.log(request.responseText);
    }
  };
  console.log(JSON.stringify({
    url: url.value
  }));
  request.send(JSON.stringify({
    url: url.value
  }));
};
