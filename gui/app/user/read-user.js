/**
 * Ajax call to get the users with GET method
 *
 * Response code :
 *  200 if success
 *  404 if none found
 *  400 if bad request
 */
function readUsers() {
  var urlDest = "http://localhost/FalconNews/api/user/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("getNews() success: " + jsonVar);
      displayUsers(jsonVar);
    }else if(request.status === 404 && request.readyState === request.DONE){
   //window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";
     displayUsers(jsonVar);
    } else {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("getNews() failed: " + request.responseText)
    }
  }
  request.send();
};

/**
 * Display the users
 */
function displayUsers(data) {
  console.log(data);
  // Extract value for headers
  var col = [];
  for (var i=0; i < data.length; i++) {
    for(var key in data[i]) {
      if(col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // create dynamic table
  var table = document.createElement("table");

  // add json data to the table as rows
  for (var i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);
    for (var j=1; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];

      var tabDeleteCell = tr.insertCell(-1);
      var strHtml = "<button id=" + data[i][col[j-1]] + " onclick='javascript:location.reload(false),deleteUser(this.id)'  class='btn btn-danger'><span class='icon'><i class='fas fa-trash'></i></span></button>";
      tabDeleteCell.innerHTML = strHtml;
    }
  }

  // finally add the newly created table with json data to a container
  var divContainer = document.getElementById("feedUrls");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
};
