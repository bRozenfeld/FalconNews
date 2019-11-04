
function myFunction() {
  var myInput = document.getElementById("password1");
  if (myInput.type === "password") {
    myInput.type = "text";
  } else {
    myInput.type = "password";
  }
} 


function Check(){
	var myInput = document.getElementById("password1");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");

  
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
	
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
	
}


  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");

  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
	
  }


  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
	
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
	
  }


  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");

  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
	
  }
}

function checkPasswordMatch(){
	var password1 = document.getElementById("password1").value;
    var confirmPassword = document.getElementById("password2").value;

    if (password1 === confirmPassword){
       document.getElementById('pwmatch').classList.remove("invalid");
       document.getElementById('pwmatch').classList.add("valid");
	   document.getElementById('pwmatch').innerHTML = 'passwords matching';
    }else{
       document.getElementById('pwmatch').classList.remove("valid");
       document.getElementById('pwmatch').classList.add("invalid");
	   document.getElementById('pwmatch').innerHTML = 'passwords not matching';
  }
}

