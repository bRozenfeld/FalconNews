document.addEventListener("DOMContentLoaded", function() {
  console.log("read-news.js loaded");
  getNews();
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
}
