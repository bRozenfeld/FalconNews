// listener on document load
document.addEventListener("DOMContentLoaded", function() {
  console.log("read-news.js loaded");
  updateFeeders();
  getNews();
  setInterval(update, 180000); // refresh the news each 3 minutes
  setInterval(updateFeeders, 600000) // update the feeders each 10minutes
});

// listener on keystroke
document.addEventListener("keyup", function(event) {
  console.log("keyup event triggered");
  openFullScreen();
});

// Get the news to display
function getNews() {
  console.log("Entering getNews() method");

  var urlDest = "http://localhost/FalconNews/api/news/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      console.log("getNews() success: " + jsonVar);
      displayNews(jsonVar);
    } else {
      var jsonVar = JSON.parse(request.responseText);
      console.log("getNews() failed: " + request.responseText)
    }
  }
  request.send();
};

// update the news displayed
function updateNews() {
  var id = document.getElementById("id");
  var priority = document.getElementById("priority");
  var prioVal = priority.value + 1;

  if(prioVal > 0) {
    var urlDest = "http://localhost/FalconNews/api/news/update.php";
    var method = "PUT";
    var request = new XMLHttpRequest();
    request.open(method, urlDest);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if (request.status === 200 && request.readyState === request.DONE) {
        var jsonVar = JSON.parse(request.responseText);
        console.log("updateNews() success: " + jsonVar);
      } else {
        var jsonVar = JSON.parse(request.responseText);
        console.log("updateNews() failed: " + request.responseText);
      }
    }
    request.send(JSON.stringify({
      id: id.value,
      is_displayed: false,
      priority: prioVal
    }));
  } else {
    deleteNews(id.value);
  }
};

// delete the news
function deleteNews(id) {
  var urlDest = "http://localhost/FalconNews/api/news/delete.php";
  var method = "DELETE";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      console.log("deleteNews() success: " + jsonVar);
    } else {
      var jsonVar = JSON.parse(request.responseText);
      console.log("updateNews() failed: " + request.responseText)
    }
  }
  request.send(JSON.stringify({
    id: id
  }));
};

// update the news on the screen
function update() {
  updateNews();
  getNews();
};

// function to display the news on the screen
function displayNews(data) {
  console.log("Enter displayNews(data) method -> jsonVar: ");
  console.log(data);

  var title = document.getElementById("title");
  title.innerHTML = data[0].title;

  var description = document.getElementById("description");
  description.innerHTML = data[0].description;

  var pubDate = document.getElementById("pubDate");
  pubDate.innerHTML = data[0].published_date;

  var url = document.getElementById("url");
  url.innerHTML = data[0].url;

  var id = document.getElementById("id");
  id.innerHTML = data[0].id;

  var priority = document.getElementById("priority");
  priority.innerHTML = data[0].priority;
};

// function to open the document in full screen mode
function openFullScreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
};



function updateFeeder(data) {
  var urlDest = "http://localhost/FalconNews/api/feeders/update.php";
  var method = "POST";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      console.log(request.responseText);
      var jsonVar = JSON.parse(request.responseText);
      console.log("updateFeeder() Success: " + jsonVar);
    } else {
      console.log(request.responseText);
    }
  }
  request.send(JSON.stringify({
    id: data.id,
    url: data.url
  }));
}

// update the feeders
function updateFeeders() {
  console.log("Entering getFeeders() method");

  var urlDest = "http://localhost/FalconNews/api/feeders/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var data = JSON.parse(request.responseText);
      console.log("getFeeders() Success: " + data);
      for(var i = 0; i < data.length; i++) {
        updateFeeder(data[i]);
      }
    } else {
      console.log(request.responseText);
    }
  }
  request.send();
};
