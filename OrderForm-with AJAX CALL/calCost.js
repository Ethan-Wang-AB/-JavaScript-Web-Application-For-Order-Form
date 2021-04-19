// this is used to put current time on the screen top
window.onload = initFunction;

function initFunction() {
    var toDay = new Date();

    document.getElementById("dtfield").innerHTML = toDay;

}
// this is used to set interval 1s to let the function refresh time every second.
setInterval("initFunction()", 1000);

//this function is used to get value of the quantities, and if customer doesnt input anything then it would be 0
function getValue(id) {
    var qty = 0;
    var elementOnWebpage = document.getElementById(id);


    if (elementOnWebpage && elementOnWebpage.value !== undefined) {

        var string = document.getElementById(id).value;
        if (elementOnWebpage.value !== "") {
            qty = parseFloat(string);
        }
    }
    return qty;

}
//this function is used to get value of the String, and if customer doesnt input anything then it would be "";
function getStringValue(id) {
    var elementOnWebpage = document.getElementById(id);
    var string = "";
    if (elementOnWebpage && elementOnWebpage.value !== undefined) {
        string = elementOnWebpage.value;
    }
    return string;
}
//this function is used to check if pick-time is within 1-4 hours within current time and if current time is within 10am and 6pm. 
//this time range will give a valid pick-time time range 


//thie function is used to set currency formation of total amount.

// this is the main function in js file. to calculate the total amount
//check if each qty of food less or equal to 5
//check time input
//give order detail to customers
//check total amount, if it is zero, alert customer to order something
var oversize = 0
var total = 0
var shape = 0
var ratio=1
var radius = getValue('radius')
var length = getValue('length')
var width = getValue('width')
var layer = 0
function calcsheet() {
    shape = 0
    const base0 = 900
    var length = getValue('length')
    if (length < 30 || length > 60) {
        length = 0
    }
    var width = getValue('width')
    if (width < 30 || width > 45) {
        width = 0
    }
    var layer = parseFloat(RetrieveRadioButtonValue('layer'));
    var ratio = 1
    if (layer == 2) { ratio = 1.5 }
    if (layer == 3) { ratio = 2 }

    oversize = (length * width - base0) * 0.02.toFixed(2)
    if (oversize < 0) {
        oversize = 0
    }
    total = (((length * width - base0) * 0.02 + 18) * ratio).toFixed(2)
    
}
function calcround() {
    shape = 1
    const base1 = 707
    const PI = 3.14
    var radius = getValue('radius')
    if (radius < 15 || radius > 30) {
        radius = 0
    }
    var layer = parseFloat(RetrieveRadioButtonValue('layer'));
    var ratio = 1
    if (layer == 2) { ratio = 1.5 }
    if (layer == 3) { ratio = 2 }

    // debugger
    if (radius == 30) {
        total = (15 * ratio).toFixed(2).toFixed(2)
    } else {
        oversize = ((radius * radius * PI).toFixed(1) - base1) * 0.02.toFixed(2)
        if (oversize < 0) {
            oversize = 0
        }
        total = ((((radius * radius * PI).toFixed(1) - base1) * 0.02 + 15) * ratio).toFixed(2)
    }


}

function calctotal() {
    //get data from the form
     //  debugger

    var address = getStringValue("address");
    var email = getStringValue("email");
    var firstname = getStringValue("firstName");
    var lastname = getStringValue("lastName");
    var phoneN = getStringValue("phone");
    var additional = 0
    var postcode = getStringValue("postcode");


    // debugger


    var value = RetrieveCheckBoxValues('additional')
    if (value != undefined && value.length > 0) {
        for (let idx = 0; idx < value.length; idx++) {
            // debugger
            additional = additional + parseFloat(value[idx])
        }
    }



    console.log("The total of your order is " + total + "Topping");
    var fragAdditional = ""
    var checkboxGrouping = document.getElementsByName('additional');
    if (checkboxGrouping[0]
        && checkboxGrouping[0].value !== undefined
        && checkboxGrouping[0].checked !== undefined) {
        if (checkboxGrouping[0].checked) {
            fragAdditional = fragAdditional + `
            <tr>
            <td>Cream Cheese icing</td>
             <td class="amount">$5</td>
              </tr>   `;
        }
    }

    if (checkboxGrouping[1]
        && checkboxGrouping[1].value !== undefined
        && checkboxGrouping[1].checked !== undefined) {
        if (checkboxGrouping[1].checked) {
            fragAdditional = fragAdditional + `
            <tr>
            <td>Fruit and Almond topping</td>
             <td class="amount">$7</td>
              </tr>   `
        }
    }
    if (checkboxGrouping[2]
        && checkboxGrouping[2].value !== undefined
        && checkboxGrouping[2].checked !== undefined) {
        if (checkboxGrouping[2].checked) {
            fragAdditional = fragAdditional + `
            <tr>
            <td>Fruit Jam filling</td>
             <td class="amount">$4</td>
              </tr>   `
        }
    }
    var additionalState = ""


    if (ratio == 1.5) {
        additionalState = additionalState + `
    <tr>   <td>+ Additional Layer #2</td>   <td class="amount">$ ${(oversize + 15) * 0.5}</td> </tr> 
    <tr>  <td>Cost of Cake</td>   <td class="amount" id="subtotal">$ ${total}</td> </tr> `
    }
    if (ratio == 2) {
        additionalState = additionalState + `
    <tr>  <td>+ Additional Layer #2</td>   <td class="amount">$ ${(oversize + 15) * 0.5}</td> </tr>
    <tr>   <td>+ Additional Layer #3</td>   <td class="amount">$ ${(oversize + 15) * 0.5}</td> </tr> 
    <tr>  <td>Cost of Cake</td>   <td class="amount" id="subtotal">$ ${total}</td> </tr> `

    }

    var fragmentLine = "";
    if (shape == 0) {
        var fragmentLine = fragmentLine + `

    <tr>
    <td>Sheet cake ${length} cm X width ${width} cm with ${layer} layers </td>
    <td></td>  </tr>
    <tr> <td>base cake 30cm x 30cm</td>    <td class="amount">$ 18</td> </tr>
    <tr> <td>oversized cake ${length} cm X  ${width} cm </td>     <td class="amount">$ ${oversize.toFixed(2)}</td> </tr>
    <tr>   <td>First Layer</td>   <td id="subtotal" class="amount">$ ${parseFloat(oversize + 18).toFixed(2)}</td> </tr>

         `+ additionalState + fragAdditional;
    }


    if (shape == 1) {
        var fragmentLine = fragmentLine + `
      
    <tr>
    <td>Round cake ${radius} cm with ${layer} layers </td>  <td></td></tr>
    <tr> <td>base cake radius 15cm </td>    <td class="amount">$ 15</td> </tr>
    <tr> <td>oversized cake Radius ${radius} cm </td>   <td class="amount">$ ${oversize.toFixed(2)}</td> </tr>
    <tr>  <td>First Layer</td>   <td class="amount" id="subtotal">$ ${parseFloat(oversize + 15).toFixed(2)}</td> </tr> 
         `+ additionalState + fragAdditional;
    }

    var totalvalue = (parseFloat(total) + parseFloat(additional)).toFixed(2)
    fragmentLine = fragmentLine + ` <tr><td>Total Amount is </td><td class="amount" id="total"> ${"$ " + totalvalue}</td></tr>  `;
    var htmlFragment = `
    <div>${firstname + " " + lastname}</div>
    <div>${address}</div>
    <div>${postcode}</div>
    <div>${phoneN}</div>
    <div>${email}</div>
    <h3>Your Order:</h3>
    <table>
    ${fragmentLine}</table>`
  
    var elementOnWebpage = document.getElementById("orderdetail");
    if (elementOnWebpage && elementOnWebpage.innerHTML !== undefined) {
        // debugger
        if (total !=0) {
            elementOnWebpage.innerHTML = htmlFragment;
        }
        else elementOnWebpage.innerHTML = "You have to order something before submit. Length, width or radius should be valid input";
    }

}
function RetrieveRadioButtonValue(groupName) {
    // debugger;
    var value = "";
    var radioButtonGrouping = document.getElementsByName(groupName);
    if (radioButtonGrouping && radioButtonGrouping.length > 0) {
        // We need to search for which radio button was selected
        // by looking at the checked value https://www.w3schools.com/jsref/prop_radio_checked.asp
        for (let idx = 0; idx < radioButtonGrouping.length; idx++) {
            if (radioButtonGrouping[idx]
                && radioButtonGrouping[idx].value !== undefined
                && radioButtonGrouping[idx].checked !== undefined) {
                if (radioButtonGrouping[idx].checked) {
                    value = radioButtonGrouping[idx].value;
                    break;  // No use looking at the next checkboxes because only one can be checked
                }
            }
        }
    }
    else {
        console.log("Could not find radio button group named '" + groupName + "'");
    }
    return value;
}

function RetrieveCheckBoxValues(groupName) {
    // debugger;
    var value = [];
    var checkboxGrouping = document.getElementsByName(groupName);
    if (checkboxGrouping && checkboxGrouping.length > 0) {
        // We need to search for which checkbox was selected
        // by looking at the checked value https://www.w3schools.com/jsref/prop_checkbox_checked.asp
        for (let idx = 0; idx < checkboxGrouping.length; idx++) {
            if (checkboxGrouping[idx]
                && checkboxGrouping[idx].value !== undefined
                && checkboxGrouping[idx].checked !== undefined) {
                if (checkboxGrouping[idx].checked) {
                    value.push(checkboxGrouping[idx].value);
                }
            }
        }
    }
    else {
        console.log("Could not find checkbox group named '" + groupName + "'");
    }
    return value;
}
//var ajaxCall;


function getCalcCake() {
   // debugger
    var ajaxCall = new XMLHttpRequest();
    // Setup the callback function
    shape=RetrieveRadioButtonValue('shape')
    if (shape == 0) {
        ajaxCall.onreadystatechange = function () {
            if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {
                document.getElementById('caketype').innerHTML = ajaxCall.responseText;
            }
        };
        
        // Indicate the URL to the form we want to load
        ajaxCall.open("GET", "./SheetCakeOptions.html", true);
        ajaxCall.send();
    }
    if (shape == 1) {
  
         
            // Setup the callback function
            ajaxCall.onreadystatechange = function () {
                if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {
                    document.getElementById('caketype').innerHTML = ajaxCall.responseText;
                }
            };
            // Indicate the URL to the form we want to load
            ajaxCall.open("GET", "./RoundCakeOptions.html", true);
            ajaxCall.send();
        }
     
    }
    function getOptionAddOn() {
        var ajaxCall1 = new XMLHttpRequest();
        // Setup the callback function
        ajaxCall1.onreadystatechange = function() {
          if (ajaxCall1.readyState == 4 && ajaxCall1.status == 200) {
            document.getElementById('toppings').innerHTML = ajaxCall1.responseText;
          }
        };
        // Indicate the URL to the form we want to load
        ajaxCall1.open("GET", "./OptionalAddOns.html", true);
        ajaxCall1.send();
      }
      function selection() {
        var ajaxCall3 = new XMLHttpRequest();
        // Setup the callback function
        ajaxCall3.onreadystatechange = function() {
          if (ajaxCall3.readyState == 4 && ajaxCall3.status == 200) {
            document.getElementById('caketype').innerHTML = ajaxCall3.responseText;
          }
        };
        // Indicate the URL to the form we want to load
        ajaxCall3.open("GET", "./CakeTypeSelection.html", true);
        ajaxCall3.send();
        document.getElementById('toppings').innerHTML="";
      }
      function showInvoice() {
        var ajaxCall2 = new XMLHttpRequest();
        // Setup the callback function
        ajaxCall2.onreadystatechange = function() {
          if (ajaxCall2.readyState == 4 && ajaxCall2.status == 200) {
            document.getElementById('invoice').innerHTML = ajaxCall2.responseText;
          }
        };
        // Indicate the URL to the form we want to load
        ajaxCall2.open("GET", "./Invoice.html", true);
        ajaxCall2.send();
 
      }