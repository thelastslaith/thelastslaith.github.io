
<!--- Countdown Clock 1-->

var deadline = new Date("June 1 , 2020 20:00:00").getTime(); 
var x = setInterval(function() { 
var now = new Date().getTime(); 
var t = deadline - now; 
var years = Math.floor(t / (1000 * 60 * 60 * 24 * 365)); 
var days = Math.floor(t / (1000 * 60 * 60 * 24)) - (years *365); 
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 
document.getElementById("Countdown").innerHTML = years +"y " + days + "d " 
+ hours + "h " + minutes + "m " + seconds + "s "; 
	if (t < 0) { 
		clearInterval(x); 
		document.getElementById("Countdown").innerHTML = "EXPIRED"; 
	} 
}, 1000); 


<!--- Countdown Clock 2-->
var deadline2 = new Date("Sep 1, 2020 09:00:00").getTime(); 
var x = setInterval(function() { 
var now = new Date().getTime(); 
var t = deadline2 - now; 
var years = Math.floor(t / (1000 * 60 * 60 * 24 * 365)); 
var days = Math.floor(t / (1000 * 60 * 60 * 24)) - (years *365); 
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 
document.getElementById("Countdown2").innerHTML = years +"y " + days + "d " 
+ hours + "h " + minutes + "m " + seconds + "s "; 
	if (t < 0) { 
		clearInterval(x); 
		document.getElementById("Countdown2").innerHTML = "EXPIRED"; 
	} 
}, 1000); 