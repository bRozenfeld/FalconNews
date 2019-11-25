
document.addEventListener("DOMContentLoaded", function() {
  console.log("create-feeder.js load");
  getFeeders();

  var url = document.getElementById('url');

  url.addEventListener('change', function(e) {
    var val = url.value;
  });
});

document.getElementById('add').addEventListener('click', function(e) {
	e.preventDefault();
});


function addFeeder() {
  console.log("entering addFeeder() method -> URL value: " + url.value);

/**
 * Add this url as a feed with POST method
 *
 * Response code :
 *  201 is successfully added
 *  503 if database error
 *  400 if bad url or data missing
 *  500 if already 15 feed has been added
 */
function createFeeder() {
  var url = document.getElementById('url');
  console.log(url.value);
>>>>>>> f9b2de1a07098f909fbb102514a05ff614287594
  var urlDest = "http://localhost/FalconNews/api/feeders/create.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
<<<<<<< HEAD
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      //getFeeders();
	  console.log("200");
    } else if(request.status === 201) {
      //console.log(request.responseText);
	  console.log("201");
	  //setTimeout(getFeeders(),5000);
	}
};
  request.send(JSON.stringify({
    url: url.value
  }));
};

function getFeeders() {
  console.log("Entering getFees() method");

  var urlDest = "http://localhost/FalconNews/api/feeders/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {

    if (request.status === 201 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log(jsonVar);
      readFeeders();
    } else if(request.status === 400 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      console.log(jsonVar);
    } else if(request.status === 500 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      console.log(jsonVar);
    } else if(request.status === 503 && request.readyState === request.DONE) {

      var jsonVar = JSON.parse(request.responseText);
      console.log(jsonVar);
    } else {

      console.log(request.responseText);

      var jsonVar = JSON.parse(request.responseText);
      console.log(jsonVar);

    }
};
  request.send(JSON.stringify({
    url: url.value
  }));
};
