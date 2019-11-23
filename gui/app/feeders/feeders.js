/**
 * When document is loading, first get the token
 */
document.addEventListener("DOMContentLoaded", function() {
  console.log("feeders.js load");
  var token = getToken();
  if(token !== null) {
    if(validateToken(token)) {
      console.log("ook");
    }
  }

  getFeeders();

});
