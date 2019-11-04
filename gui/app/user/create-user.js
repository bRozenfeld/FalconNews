function createUser() {
  var email = document.getElementById("email");

  var urlDest = "http://localhost/FalconNews/api/api/user/create.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log("New user success");
    } else {
      console.log("New user failed");
    }
  };
  request.send(JSON.stringify({
    email: email.value;
  }));
}
