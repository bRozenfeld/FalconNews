/**
 * When document is loading, first get the token from the secure cookies
 * Then check if the token is valid and then display the feeders
 * if token is not valid or there's no token, redirect to login page
 */
document.addEventListener("DOMContentLoaded", function() {
  var login = document.getElementById("login");
  var logout = document.getElementById("logout");
  var resetpwd = document.getElementById("reset");
  var token = getToken();
  if(token !== null) {
    validateToken(token);
    setTimeout(function() {
      if (isAuthenticated === true) {
        readFeeders();
		resetpwd.style.display="block";
		logout.style.display="block";
		login.style.display="none"; 
      } else {
		login.style.display="block";
		logout.style.display="none"; 
		resetpwd.style.display="none";
        window.location.href="http://localhost/FalconNews/gui/app/auth/auth.html";
      }
    }, 1000);
  }
  else {
    window.location.href="http://localhost/FalconNews/gui/app/auth/auth.html";
  }
});
