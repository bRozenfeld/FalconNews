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
    } else {

    }
  }
  request.send(JSON.stringify({
    id: id
  }));
};
