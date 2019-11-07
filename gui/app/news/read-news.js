// listener on document load
document.addEventListener("DOMContentLoaded", function() {
  console.log("read-news.js loaded");
  getNews();
  setInterval(update, 1800000); // refresh each 3 minutes
});

// listener on keystroke
document.addEventListener("keyup", function(event) {
  console.log("keyup event triggered");
  openFullScreen();
});

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
