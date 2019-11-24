/**
 * Delete the url identified by the given id with POST method
 *
 * Response code :
 *  200 if successfully deleted
 *  400 if data missing or bad id
 */
function deleteFeeder(id) {
  console.log("entering deleteFeeder() method");
  var urlDest = "http://localhost/FalconNews/api/feeders/delete.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log(info);
    } else if(request.status === 400 && request.readyState === request.DONE) {

    } else {

    }
  }
  request.send(JSON.stringify({
    id: id
  }));
};
