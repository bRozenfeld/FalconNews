
window.addEventListener("unload", function() {
  var id = document.getElementById("id");
  navigator.sendBeacon("http://localhost/FalconNews/api/news/update_display.php", JSON.stringify({
    id : id.innerHTML
  }));
});
