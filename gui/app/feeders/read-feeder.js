document.addEventListener("DOMContentLoaded", function() {
  console.log("read-feeder.js load");

  // div to display the list of urls
  var urls = document.getElementById("feedUrls");

  var jsonVar = getFeeders();

  var jsonStr = JSON.stringify(jsonVar);


  urls.innerHTML = jsonStr;

});

function getFeeders() {
  console.log("Entering getFeeders() method");

  var urlDest = "http://localhost/FalconNews/api/feeders/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      console.log("getFeeders() Success: " + jsonVar);
      updateFeeders(jsonVar);

    } else {
      console.log(request.responseText);
    }
  }
  request.send();
};

// Update the list of rss feeds
function updateFeeders(data) {
  console.log("Enter updateFeeders(jsonVar) method -> jsonVar: " + data);

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
      var strHtml = "<a onclick='deleteFeeder()' class='button'><span class='icon'><i class='fas fa-trash'></i></span></a>";
      tabDeleteCell.innerHTML = strHtml;
    }
  }

  // finally add the newly created table with json data to a container
  var divContainer = document.getElementById("feedUrls");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

  //var urls = document.getElementById("feedUrls");
  //var tr = document.createElement("tr");


  /*
  for(var i=0; i < jsonVar.length; i++) {
    var item = jsonVar[i];
    console.log(item);

  }
  */
};
