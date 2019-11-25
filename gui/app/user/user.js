/**
 * When document is loading, first get the token from the secure cookies
 * Then check if the token is valid and the user is an admin, display the users
 * if token is not valid or there's no token or user not admin, redirect to login page
 */
document.addEventListener("DOMContentLoaded", function() {
  var token = getToken();
  if(token !== null) {
    validateToken(token);
    setTimeout(function() {
      if (isAuthenticated === true) {
        if(checkIsAdmin(token)) {

        } else {

        }
      } else {
        window.location.href="http://localhost/FalconNews/gui/app/auth/auth.html";
      }
    }, 1000);
  }
  else {
    window.location.href="http://localhost/FalconNews/gui/app/auth/auth.html";
  }
});
