function getRSSFeedUrl(url) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  //xhr.setRequestHeader('Content-type', 'application/xml');

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readystatechange === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
    else {
      console.log(xhr.readystatechange);
    }
  });

  xhr.send();
}

(function () {
  var inputs = document.getElementsByTagName('input');

  for(var i=0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', function() {
      getRSSFeedUrl("https://api.rss2json.com/v1/api.json?rss_url=https://cyware.com/allnews/feed");
    });
  }
})();
