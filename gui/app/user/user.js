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
 *
 * Response code : 200 if token is valid
 * Response code : 401 if token not valid
 */
function validateToken(token) {
  console.log("enter valide token method");
   var urlDest = "http://localhost/FalconNews/api/user/validate_token.php";
   var method = "POST";
   var request = new XMLHttpRequest();
   request.open(method, urlDest);
   request.setRequestHeader("Content-Type", "application/json");
   request.onload = function() {
     // token valid
     if(request.status === 200 && request.readyState === request.DONE) {
       
     }
     // invalid token
     else if (request.status === 401 && request.readyState === request.DONE) {

     }
     // anything else
     else {
       var info = JSON.parse(request.responseText);
       console.log(info);
     }
   };
   request.send(JSON.stringify({
     jwt: token
   }));
}
