/**
 * Create a new user and send him mail and password with POST method
 *
 * Response Code:
 *  201 if new user added succesfully
 *  400 otherwise
 */
function createUser() {
  var email = document.getElementById("email");

  var urlDest = "http://localhost/FalconNews/api/user/create.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 201 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log(info);
      readUsers();
    } else {
      var info = JSON.parse(request.responseText);
      console.log(info);
      readUsers();
    }
  };
  request.send(JSON.stringify({
    email: email.value
  }));
}
