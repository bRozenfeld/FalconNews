/**
 * Update the news currently displayed with POST method
 *
 * Response code :
 *  200 if succesfully updated
 *  400 if bad request
 */
function updateNews() {
  var id = document.getElementById("id");
  var priority = document.getElementById("priority");
  var prioVal = priority.innerHTML - 1;

  if(prioVal > 0) {
    var urlDest = "http://localhost/FalconNews/api/news/update.php";
    var method = "POST";
    var request = new XMLHttpRequest();
    request.open(method, urlDest);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if (request.status === 200 && request.readyState === request.DONE) {
        //console.log(request.responseText);
        var jsonVar = JSON.parse(request.responseText);
        //console.log("updateNews() success: " + jsonVar);
      }else if(request.status === 404){
		     //window.location.href="http://localhost/falconnews/gui/app/error/page404.html";

	  }else {
        //console.log(request.responseText);
        var jsonVar = JSON.parse(request.responseText);
        //console.log("updateNews() failed: " + request.responseText);
      }
    }
    request.send(JSON.stringify({
      id: id.innerHTML,
      is_displayed: "0",
      priority: prioVal
    }));
  } else {
    deleteNews(id.innerHTML);
  }
};
