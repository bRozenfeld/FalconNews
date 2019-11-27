/**
 * Listener on document loaded
 * First get the token and verify the informations about the user
 * ie if he is authenticated or not
 */
document.addEventListener("DOMContentLoaded", function() {
  //console.log("read-news.js loaded");
  updateFeeders();
  readNews();
  fullScreenDimensions();
  //scrollAuto();
  setInterval(update, 30000); // refresh the news each 3 minutes
  setInterval(updateFeeders, 600000) // update the feeders each 10minutes

  var token = getToken();
  if(token !== null) {
    validateToken(token);
    setTimeout(function() {
      // not authenticated
      if (isAuthenticated !== true) {
        var usersLink = document.getElementById("linkUser");
        usersLink.style.display = "none";
        var feedersLink = document.getElementById("linkFeeders");
        feedersLink.style.display = "none";
      }
      // authenticated
      else {
        // not admin
        if(isAdmin !== true) {
          var usersLink = document.getElementById("linkUser");
          usersLink.style.display = "none";
        }
      }
    }, 1000);
  }
  // no token
  else {
    var usersLink = document.getElementById("linkUser");
    usersLink.style.display = "none";
    var feedersLink = document.getElementById("linkFeeders");
    feedersLink.style.display = "none";
  }

});

/**
 * Listener on keystroke
 * Each time the user will press a button it will put the page in full screen mode
 */
 document.addEventListener("keyup", function(event) {
   //console.log("keyup event triggered");
   openFullScreen();
 });

/**
 * Listener on the page mode (fullscreen or not)
 * If fullscreen, hide the menu
 * Else show the menu
 */
 document.addEventListener("fullscreenchange", function(event){
 	if(document.fullscreen) {
 		invisibleMenu();
 	} else {
 		visibleMenu();
 		//normalDimensions();
 	}
 });

/**
 * Listener on the page closed / changed
 * Update the news displayed currently
 */
window.addEventListener("unload", function() {
    var id = document.getElementById("id");
    navigator.sendBeacon("http://localhost/FalconNews/api/news/update_display.php", JSON.stringify({
      id : id.innerHTML
  }));
});


/**
 * Update the news displayed on the screen and retrieve an other news
 */
function update() {
  updateNews();
  readNews();
};


/**
 * Put the news page in fullscreen mode
 */
function openFullScreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
  //menu.style.display="none";
};

/**
 * Hide the menu
 */
function invisibleMenu(){
	var menu = document.getElementById("menu");
	menu.style.display="none";
};

/**
 * Show the menu
 */
function visibleMenu() {
	var menu = document.getElementById("menu");
	menu.style.display="block";

};

/**
 * Update the dimensions when in fullscreen mode
 */
function fullScreenDimensions(){
	var width = window.screen.width;
	var height= window.screen.height;
	document.getElementById("news").style.width=width;
	document.getElementById("news").style.margins="-20px";
	document.getElementById("news").style.height=height;
};

/**
 * Update the dimensions when not in fullscreen mode
 */
function normalDimensions(){
	document.getElementById("news").style.width="";
	document.getElementById("news").style.height="";
};

function scrollAuto()
{
  window.scrollBy(0,2);
  setTimeout('scrollAuto()',500);
};
