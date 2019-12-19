/**
 * Add this url as a feed with POST method
 *
 * Response code :
 *  201 is successfully added
 *  503 if database info
 *  400 if bad url or data missing
 *  500 if already 15 feed has been added
 */
function createFeeder() {
  var url = document.getElementById('url');
  var urlDest = "http://localhost/FalconNews/api/feeders/create.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Authorization", getToken());
  request.onload = function () {
    if (request.status === 201 && request.readyState === request.DONE) {
       var infos = JSON.parse(request.responseText);
       var info = document.getElementById("info");
       info.innerHTML = info.message;
       readFeeders();
     } else if(request.status === 400 && request.readyState === request.DONE) {
       var jsonVar = JSON.parse(request.responseText);
       var info = document.getElementById("info");
       info.innerHTML = jsonVar.message;
     } else if(request.status === 500 && request.readyState === request.DONE) {
       var jsonVar = JSON.parse(request.responseText);
       var info = document.getElementById("info");
       info.innerHTML = jsonVar.message;
       console.log(jsonVar.message);
     } else if(request.status === 503 && request.readyState === request.DONE) {
       var jsonVar = JSON.parse(request.responseText);
       var info = document.getElementById("info");
       info.innerHTML = jsonVar.message;
       console.log(jsonVar.message);
     } else {
       var info = document.getElementById("info");
       info.innerHTML = info.message;
       console.log("Data processing");
     }
  }
  request.send(JSON.stringify({
    url: url.value
  }));
};
