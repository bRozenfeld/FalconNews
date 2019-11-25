

// listener on document load
document.addEventListener("DOMContentLoaded", function() {
  //console.log("read-news.js loaded");
  updateFeeders();
  getNews();
  fullScreenDimensions();
  scrollAuto();
  setInterval(update, 120000); // refresh the news each 2 minutes
  setInterval(updateFeeders, 600000) // update the feeders each 10minutes
});

// listener on keystroke

document.addEventListener("keyup", function(event) {
  //console.log("keyup event triggered");
  openFullScreen();

});

document.addEventListener("fullscreenchange", function(event){
	console.log(document.fullscreen);
	if(document.fullscreen) {
		invisibleMenu();

	} else {
		visibleMenu();

		//normalDimensions();
	}
});

window.addEventListener("unload", function() {
  var id = document.getElementById("id");
  navigator.sendBeacon("http://localhost/FalconNews/api/news/update_display.php", JSON.stringify({
    id : id.innerHTML
  }));
});


// Get the news to display
function getNews() {
  //console.log("Entering getNews() method");

  var urlDest = "http://localhost/FalconNews/api/news/read.php";
  var method = "GET";
  var request = new XMLHttpRequest();
  request.open(method, urlDest);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (request.status === 200 && request.readyState === request.DONE) {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("getNews() success: " + jsonVar);
      displayNews(jsonVar);
    }else if(request.status === 404){
		window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";

    } else {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("getNews() failed: " + request.responseText)
    }
  }
  request.send();
};

// update the news displayed
function updateNews() {
  var id = document.getElementById("id");
  var priority = document.getElementById("priority");
  var prioVal = priority.innerHTML - 1;
  console.log(prioVal);

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
        console.log("updateNews() success: " + jsonVar);
      }else if(request.status === 404){
		window.location.href="http://localhost/falconnews/gui/app/error/page404.html";

	  }else {
        //console.log(request.responseText);
        var jsonVar = JSON.parse(request.responseText);
        console.log("updateNews() failed: " + request.responseText);
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

// delete the news
function deleteNews(id) {
  console.log("entrer deletenews()");
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
    }else if(request.status === 404){
		window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";

  } else {
      var jsonVar = JSON.parse(request.responseText);
      //console.log("updateNews() failed: " + request.responseText)
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
  //console.log("Enter displayNews(data) method -> jsonVar: ");
  console.log(data);

/**
 * Ajax call to get one of the news with GET method
 *
 * Response code :
 *  200 if successful request
 *  404 if no news found
 */
 function readNews() {
   var urlDest = "http://localhost/FalconNews/api/news/read.php";
   var method = "GET";
   var request = new XMLHttpRequest();
   request.open(method, urlDest);
   request.setRequestHeader("Content-Type", "application/json");
   request.onload = function() {
     if (request.status === 200 && request.readyState === request.DONE) {
       var jsonVar = JSON.parse(request.responseText);
       //console.log("getNews() success: " + jsonVar);
       displayNews(jsonVar);
     }else if(request.status === 404 && request.readyState === request.DONE){
 		//window.location.href="http://localhost/FalconNews/gui/app/error/page404.html";

     } else {
       var jsonVar = JSON.parse(request.responseText);
       //console.log("getNews() failed: " + request.responseText)
     }
   }
   request.send();
 };

/**
 * Display the current news on the page
 *
 * @param data json with property of news
 */
function displayNews(data) {
 //console.log("Enter displayNews(data) method -> jsonVar: ");
 //console.log(data);


 var title = document.getElementById("title");
 title.innerHTML = data[0].title;

 var description = document.getElementById("description");
 description.innerHTML = data[0].description;

 var pubDate = document.getElementById("pubDate");
 pubDate.innerHTML = data[0].published_date;

 var url = document.getElementById("url");
 url.innerHTML = data[0].url;
 url.href = data[0].url;

 var id = document.getElementById("id");
 id.innerHTML = data[0].id;

 var priority = document.getElementById("priority");
 priority.innerHTML = data[0].priority;

 var img = document.getElementById("img");
 if(data[0].url_img !== null) {
   img.src = data[0].url_img;
 }

 //img.src = data[0].url;
 //img.innerHTML = data[0].img
};
