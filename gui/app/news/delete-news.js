/**
 * Delete the news corresponding to this id with POST method
 *
 * @param id int
 *
 * Response code :
 *  200 if successfully deleted
 *  400 if bad id
 */
function deleteNews(id) {
  var urlDest = "http://localhost/FalconNews/api/news/delete.php";
  var method = "DELETE";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      console.log(request.responseText);
      var jsonVar = JSON.parse(request.responseText);
      //console.log("deleteNews() success: " + jsonVar);
    }
    else if(request.status === 400 && request.readyState === request.DONE){
		    //window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";
    }
    else {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("updateNews() failed: " + request.responseText)
    }
  }
  request.send(JSON.stringify({
    id: id
  }));
};
