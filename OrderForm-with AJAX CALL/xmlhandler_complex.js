// Using ajax to retrieve content of web page
var asynchrequest;		// This will be our global variable of type XMLHttpRequest


// See https://www.w3schools.com/jsref/met_document_addeventlistener.asp

//  This adds an event listener that waits for the web page to finish loading
//  before it calls the function registerListeners()
//
//     This ensures that the document object model actually has the elements all loaded
//		otherwise if attempt to access document.getElementById("id") in our JavaScript
//		too early in the page lifecycle (before the web browser has parsed all the HTML
//		our JavaScript statements might fail )
//
window.addEventListener("load", registerListeners, false);
// see https://www.w3schools.com/jsref/event_onload.asp

// We could have also coded the onload event listener this way:
//	window.onload = new function() {
//		registerListeners();
//	}

// Or we could have added a onload="registerListeners()" as an attribute of the <body> tag 
// in our HTML markup
// e.g.,
//			<!DOCTYPE html>
//			<html>
//				<head></head>
//				<body onload="registerListeners();">
//					<!-- HTML Markup would go in here -->
//				</body>
//			</html>


//#region function registerListeners() 
function registerListeners() {
    // We're using the defensive programming style instead of the more common style shown on this
    // next line that you'll see other developer write
    //  
    //     	document.getElementById("carpic1")..addEventListener("mouseover", function () { getContent("exner.html"); }, false);
    //
    //  You see the above method commonly in textbooks, and on Internet web sites. The problem with the above
    //  line of code is that it works sometimes, and it dies other times, depending on timing of when
    //  the lifecycle of the web page has finished loading, if the id was mispelled, etc.
    //
    //  If we are not using defensive programming techniques we would not know that the id we are searching for doesn't actually exist yet
    //  because we are tool early in the lifecycle or we might have requested an id which was spelled differently
    //  ( e.g. in the HTML was id="carPic1" and we are searching for id='carpic1' )
    // 
    //  ALWAYS use defensive techniques to ensure you have code gracefully recovers, and that tells you what is wrong
    //  otherwise, you might spend hours trying to figure out what the problem is, and when you could have just looked
    //  at the console logs and seen what the error was that you coded up
    //
    //
  //  RetrieveHTMLPageWithClear('carpic1', 'exner.html', false);


    
    RetrieveHTMLPageWithClear('caketype', 'CakeTypeSelection.html', false);
    // Since we are going to repeat this same logic over and over can, we should refactor this out to a function
    // and call the function passing in a few parameters
    RetrieveHTMLPageWithClear('sheetcake', 'SheetCakeOptions', false);

    // imgElement = document.getElementById("carpic2");
    // if (imgElement) {
    //     imgElement.addEventListener("mouseover", function () { getContent("shelbydaytona.html"); }, false);
    //     imgElement.addEventListener("mouseout", clearContent, false);
    // }
    // else {
    //     console.log("Could not find element 'carpic2'");
    // }

    // Here we have refactored that code, and not we're going to use a standard function that used the defensive
    // techniques, and handles errors gracefully

    RetrieveHTMLPageWithClear('roundcake', 'RoundCakeOptions.html', false);
    // imgElement = document.getElementById("carpic3");
    // if (imgElement) {
    // 	imgElement.addEventListener("mouseover", function () { getContent("countach.html"); }, false);
    // 	imgElement.addEventListener("mouseout", clearContent, false);
    // }
    // else {
    // 	console.log("Could not find element 'carpic3'");
    // }
    RetrieveHTMLPageWithClear('toppings', 'OptionalAddOns.html', false);
    RetrieveHTMLPageWithClear('invoice', 'Invoice.html', false);
   

    RetrieveHTMLPageWithClearAdvanced("caketype");
    RetrieveHTMLPageWithClearAdvanced("sheetcake");
    RetrieveHTMLPageWithClearAdvanced("roundcake");
    RetrieveHTMLPageWithClearAdvanced("toppings");
    RetrieveHTMLPageWithClearAdvanced("orderdetail");
 

}
//#endregion

function RetrieveHTMLPageWithClearAdvanced(id) {
    var imgElement = document.getElementById(id);
    if (imgElement) {
        imgElement.addEventListener("mouseover",getContentFromData,false);
        imgElement.addEventListener("mouseout", clearContent, false);
    }
    else {
        console.log(`I could not find id of '${id}' so I could not attach a onmouseover event listener`);
    }
}

function getContentFromData(event) {
	debugger;
	var whoWasMousedOver = event.currentTarget;
	if (whoWasMousedOver && whoWasMousedOver.id !== undefined) {
		var element = document.getElementById(whoWasMousedOver.id);
		if (element) {
			var loadFile = element.getAttribute('data_LoadFile');
			if (loadFile) {
				getContent(loadFile);
			}
		}
		else {
			console.log(`I could find the target id of '${whoWasMousedOver.id}' so I could not load it`);
		}
	}
	else {
		console.log("Could not determine the target");
	}

}
//#region function RetrieveHTMLPageWithClear(id, url, isAsync)
// This is a generic routine we wrote, since we are doing this same 7 lines over and over again
function RetrieveHTMLPageWithClear(id, url, isAsync) {
    var findElement = document.getElementById(id);
    if (findElement) {
        findElement.addEventListener("mouseover", function () { getContent(url); }, isAsync);
        findElement.addEventListener("mouseout", clearContent, isAsync);
    }
    else {
        console.log(`Could not find element '${id}'. May be too early in page lifecycle, or check id is valid`);
    }
}
//#endregion

//#region function getContent(infopage)
function getContent(infopage) {

    // We use a variable that is defined at the global scope because the variable
    // goes out of scope when this function has finished executing.  If we used a locally
    // declared variable we may not be able to access the .readyState and .status in the 
    // unnamed function

    // Create the XMLHttpRequest object
    asynchrequest = new XMLHttpRequest();

    // Define a callback function that will get called whenever the state changes on the 
    // async request.  This can be called repeatedly (whenever the status changes)
    //
    // Note:  The creation and assignment of the function does not mean that the code inside
    //        the function runs immediately.  It simply defines the function, and what code
    //		  will be executed when the callback event occurs
    //
    asynchrequest.onreadystatechange = function () {

        // when this function finally gets called, we need to check the .readyState and the
        // .status to determine if the async process is ready for use to begin working
        if (asynchrequest.readyState == 4 && asynchrequest.status == 200) {
            // Ok, the request completed, and we have the response in the .responseText
            // or the .responseHTML property of the variable we created as an XMLHttpRequest

            // Find the element we want to update
            var updateElement = document.getElementById("carinfo-panel");
            if (updateElement && updateElement.innerHTML !== undefined) {
                // Determine whic radio button was pressed
                var radioButtonPressed = RetrieveRadioButtonValue('injectMethod');

                // if we found it, and it supports .innerHTML, then we can transfer the
                // XML which was retrieved from the web server into the .inner HTML
                //   In this case, we're using the .responseText
                //   but we could also use the .reponseXML property of our variable asynchrequest
                switch (radioButtonPressed) {

                    case "responseText":
                        // debugger;
                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;

                    case "parseXMLfromResponseText":
                        // debugger;
                        // See https://www.w3schools.com/xml/xml_parser.asp  
                        var htmlFragment = ParseTextAsXML(asynchrequest.responseText, 'body');
                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;

                    case "responseXML":
                        // debugger;
                        console.log(`XML response was \n${asynchrequest.responseXML}`);
                        updateElement.innerHTML = asynchrequest.responseXML;
                        break;

                    default:
                        // debugger;
                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;
                }
                ToggleClassState('carinfo-panel','hidden',false);
            }
            else {
                console.log(`Could not find element with id 'carinfo' or it doesn't support .innerHTML`);
            }
        }
        else {
            console.log(`Async callback to our logic but .readyState == ${asynchrequest.readyState} && .status == ${asynchrequest.status}`);
        }
    };

    // Now that we have setup our "callback" function

    // Lets tell the XMLHttpRequest object which URL we want to retrieve (the user is in infopage),
    // and which method we want to request it (a GET request), and if we want to wait for the
    // request (a synchronous request would pass false as the 3rd parameter) or if we want to
    // continue to execute code so that the request operates asynchronously
    asynchrequest.open("GET", infopage, true);

    // This sends the request off to the URL indicated in the .open, using the method requested
    asynchrequest.send();

    // Since we said it was allowed to run Asynchronously, we'll exist this function
    // and the "callback" will occur at a later point in time (which may be sub-seconds or several
    // minutes depending on network traffic, how busy the web server is, etc.)

}
//#endregion

//#region function ParseTextAsXML(rawXML, id)
// Given some text that represents XML, load it as XML, then extract the elements that are
// the child nodes of a specific node the XML as a string
function ParseTextAsXML(rawXML, id) {
    // debugger;
    var returnString = "";
    // see https://www.w3schools.com/xml/xml_parser.asp 
    var parser = new DOMParser();
    if (parser) {
        var xmlDoc = parser.parseFromString(rawXML, "text/xml");
        if (xmlDoc && id !== undefined) {
            var XMLFragment = xmlDoc.getElementsByTagName(id);
            if (XMLFragment && XMLFragment.length > 0) {
                returnString = XMLFragment[0].innerHTML;
            }
        }
    }
    else {
        console.log(`Cannot parse fragment as XML`);
        console.log(rawXML);
    }
    return returnString;
}
//#endregion


//#region function clearContent() 
// This founction will be called by the onmouseout event handler we setup to clear out the .innerHTML 
// when the mouse is no longer hovering over the element we 
function clearContent() {
    // debugger;
    // UpdateElement('carinfo-panel',"");
    ToggleClassState('carinfo-panel','hidden',true);
}
//#endregion