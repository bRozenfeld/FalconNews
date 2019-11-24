/**
 * Retrieve all the feeders and for each one update the latests news
 */
function updateFeeders() {
  //console.log("Entering getFeeders() method");
  var urlDest = "http://localhost/FalconNews/api/feeders/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var data = JSON.parse(request.responseText);
      //console.log("getFeeders() Success: " + data);
      for(var i = 0; i < data.length; i++) {
        updateFeeder(data[i]);
      }
    }else if(request.status === 404){
		window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";

  }else {
      //console.log(request.responseText);
    }
  }
  request.send();
};


/**
 * Update the feeder corresponding to the given data with POST method
 */
function updateFeeder(data) {
  var urlDest = "http://localhost/FalconNews/api/feeders/update.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      //console.log(request.responseText);
      var jsonVar = JSON.parse(request.responseText);
      //console.log("updateFeeder() Success: " + jsonVar);
    }else if(request.status === 404){
		window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";

  } else {
      //console.log(request.responseText);
    }
  }
  request.send(JSON.stringify({
    id: data.id,
    url: data.url
  }));
}
