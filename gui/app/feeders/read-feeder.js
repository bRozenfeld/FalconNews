/**
 * Get all the feeders with GET method
 *
 * Response Code :
 *  200 if successful request
 *  404 if no feeders found
 */
function readFeeders() {
  var urlDest = "http://localhost/FalconNews/api/feeders/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      updateFeeders(jsonVar);
      displayFeeders(jsonVar);
    } else if(request.status === 404 && request.readyState === request.DONE ){
  		var jsonVar = JSON.parse(request.responseText);
  	  displayFeeders(jsonVar);
      //console.log(jsonVar);
    } else {

    }
  }
  request.send();
};

/**
 * Display the feeders
 */
function displayFeeders(data) {
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
      var strHtml = "<button id=" + data[i][col[j-1]] + " onclick='javascript:location.reload(false),deleteFeeder(this.id)'  class='btn btn-danger'><span class='icon'><i class='fas fa-trash'></i></span></button>";
      tabDeleteCell.innerHTML = strHtml;
    }
  }

  // finally add the newly created table with json data to a container
  var divContainer = document.getElementById("feedUrls");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
};
