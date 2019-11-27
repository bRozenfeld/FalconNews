var isAuthenticated = false;
var isAdmin = false;

/**
 * Authenticate the user, send the following data with POST method
 * "email" : String
 * "password" : Password
 *
 * Response code : 200 if successful authenticate
 * Response code : 401 if invalid credentials
 * Response code : 400 if request invalid
 */
function login() {
  console.log("entering login() function");

  var email = document.getElementById("email");
  var password = document.getElementById("test");

  console.log(email.value);
  console.log(password.value);

  var urlDest = "http://localhost/FalconNews/api/user/login.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    // success
    if (request.status === 200 && request.readyState === request.DONE) {
      //!!! ADD SECURE TO THE COOKIE TO ENSURE YOU USE IT ONLY WITH HTTPS !!!
      var info = JSON.parse(request.responseText);
      console.log("login success : " + info);
      document.cookie = "token=" + info.jwt + ";path=/";
      window.location.href = "http://localhost/FalconNews/gui/app/news/news.html";
    }
    // invalid credentials
    else if (request.status === 401 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log(info);
    }
    // malformed request
    else if (request.status === 400 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log(info);
    }
    // anything else
    else {
      var info = JSON.parse(request.responseText);
      console.log(info);
    }
  };
  request.send(JSON.stringify({
      email: email.value,
      password: password.value
  }));
};

/**
 * Reset the password from a user
 */
function reset_password() {
  console.log("entering reset_password() function");

  var email = document.getElementById("email");

  var urlDest = "http://localhost/FalconNews/api/user/reset_password.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var info = JSON.parse(request.responseText);
      console.log("password updated : " + info);
      window.location.href = "http://localhost/FalconNews/gui/app/auth/auth.html";
    } else {
      console.log("password reset failed");
      window.location.href = "http://localhost/FalconNews/gui/app/auth/auth.html";
    }
  };
  request.send(JSON.stringify({
    email: email.value
  }));
};

/**
 * Logout the user, send the following data with POST method
 * Destroy the token in client side
 * set the variables isAuthenticated and isAdmin to false
 */
function logout() {
  var token = getToken();
  if (token !== null) {
    token = null;
  }
  isAuthenticated = false;
  isAdmin = false;
}
/**
 * Return the token conained in the cookies
 */
function getToken() {
  var cookies = document.cookie;
  var cookie = cookies.split("=");
  if(cookie[0] === "token") {
    var token = cookie[1];
    return token;
  } else {
    return null;
  }
};

/**
 * Verify that the given token is valid with POST method
 * set the attributes isAuthenticated and isAdmin depending
 * on the data presents in the token
 *
 * Response code : 200 if token is valid
 * Response code : 401 if token not valid
 */
function validateToken(token) {
   var urlDest = "http://localhost/FalconNews/api/user/validate_token.php";
   var method = "POST";
   var request = new XMLHttpRequest();
   request.open(method, urlDest);
   request.setRequestHeader("Content-Type", "application/json");
   request.onload = function() {
     // token valid
     if(request.status === 200 && request.readyState === request.DONE) {
       isAuthenticated = true;
       var response = JSON.parse(request.responseText);
       var data = response.data;
       console.log(data);
       if(data.is_admin == true) {
         isAdmin = true;
       } else {
         isAdmin = false;
       }
       //document.location.reload();
     }
     // invalid token
     else if (request.status === 401 && request.readyState === request.DONE) {
       var info = JSON.parse(request.responseText);
       console.log(info);
       isAuthenticated = false;
     }
     // anything else
     else {
       var info = JSON.parse(request.responseText);
       console.log(info);
       isAuthenticated = false;
     }
   };
   request.send(JSON.stringify({
     jwt: token
   }));
}
