//using ajax to retrieve content of web page
//based on example page 578 Internet and world wide web by Deitel et al

// This adds the onload event to the body so that the registerListners function
// is only called after the web page is loaded (we need the <body> elements loaded)
window.addEventListener("load", registerListeners, false);

// This variable is our global variable which we'll use to make all AJAX calls
var asynchrequest;

// This function will register the mouseover and mouseout events on the three images
function registerListeners() {

	var imgElement;	// This is the element we will be attaching event listeners too

	// Add event listeners to the <imgElement> with the id of "carpic1"
	//	Note that we're not using any error handling, and we're hard coding the file name
	//    We should figure out a better way to do this (and it is done in index_complex.html)
	imgElement = document.getElementById("carpic1");
	imgElement.addEventListener("mouseover", function () { getContent("exner.html"); }, false);
	imgElement.addEventListener("mouseout", clearContent, false);

	// Add event listeners to the <imgElement> with the id of "carpic2"
	//	Note that we're not using any error handling, and we're hard coding the file name
	imgElement = document.getElementById("carpic2");
	imgElement.addEventListener("mouseover", function () { getContent("shelbydaytona.html"); }, false);
	imgElement.addEventListener("mouseout", clearContent, false);

	// Add event listeners to the <imgElement> with the id of "carpic2"
	//	Note that we're not using any error handling, and we're hard coding the file name
	imgElement = document.getElementById("carpic3");
	imgElement.addEventListener("mouseover", function () { getContent("countach.html"); }, false);
	imgElement.addEventListener("mouseout", clearContent, false);

}


// This function will use an AJAX call to retrieve the web page requested by the parameter
// and it is called by the mouseover event on the image
function getContent(infopage) {

	asynchrequest = new XMLHttpRequest();
	asynchrequest.onreadystatechange = function () {
		// The logic inside this unnamed callback function is called at least 4 times
		// as it moves from readyState 1 through to 4
		if (asynchrequest.readyState == 4 && asynchrequest.status == 200) {
			document.getElementById("carinfo").innerHTML = asynchrequest.responseText;
		}
	};

	asynchrequest.open("GET", infopage, true);
	asynchrequest.send();

}


// This function will clear out the html that was loaded by the getContent() method
// and it will be called by mouseout event, when the user is no longer hovering over the image
function clearContent() {
	// No AJAX required, we'll just clear out the HTML that was loaded by the getContent() method
	document.getElementById("carinfo").innerHTML = "";

}