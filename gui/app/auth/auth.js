function login() {
  console.log("entering login() function");

  var email = document.getElementById("email");
  var password = document.getElementById("pwd");

  var urlDest = "http://localhost/FalconNews/api/user/login.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log("login success : " + info);
    } else {
      console.log("login failed");
    }
  };
  request.send(JSON.stringify({
      email: email.value,
      password: password.value
  }));
};
