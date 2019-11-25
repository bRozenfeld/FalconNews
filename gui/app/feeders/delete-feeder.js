/**
 * Delete the url identified by the given id with POST method
 *
 * Response code :
 *  200 if successfully deleted
 *  400 if data missing or bad id
 */
function deleteFeeder(id) {
  var urlDest = "http://localhost/FalconNews/api/feeders/delete.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      document.getElementById("info").innerHTML = info.message;
    } else if(request.status === 400 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      document.getElementById("info").innerHTML = info.message;
    } else {
      var info = JSON.parse(request.responseText);
      document.getElementById("info").innerHTML = info.message;
    }
  }
  request.send(JSON.stringify({
    id: id
  }));
};
