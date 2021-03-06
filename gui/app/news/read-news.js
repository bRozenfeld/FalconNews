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
      displayNews(jsonVar);
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

 var id = document.getElementById("id");
 id.innerHTML = data[0].id;

 if
 (
   checkXSS(data[0].title, data[0].id) &&
   checkXSS(data[0].description, data[0].id) &&
   checkXSS(data[0].url, data[0].id) &&
   checkXSS(data[0].priority, data[0].id) &&
   checkXSS(data[0].url_img, data[0].id) &&
 )
 {
   var title = document.getElementById("title");
   title.innerHTML = data[0].title;

   var description = document.getElementById("description");
   description.innerHTML = data[0].description;

   var pubDate = document.getElementById("pubDate");
   pubDate.innerHTML = data[0].published_date;

   var url = document.getElementById("url");
   url.innerHTML = data[0].url;
   url.href = data[0].url;

   var priority = document.getElementById("priority");
   priority.innerHTML = data[0].priority;

   var img = document.getElementById("img");
   if(data[0].url_img !== null) {
     img.src = data[0].url_img;
   }
}

 //img.src = data[0].url;
 //img.innerHTML = data[0].img
};


function checkXSS(html, id)
{
  var balise = "<script";
  if(html.includes(substring))
  {
    deleteNews(id);
    return false;
  }
  return true;
}
