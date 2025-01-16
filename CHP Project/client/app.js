function getBathValue(){
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1;
}

// function onclickedEstimatePrice() {
//     console.log("Estimate price button clicked");
//     var sqft = document.getElementById("uisqft");
//     var bath = getBathValue();
//     var bhk = getBHKValue();
//     var locations = document.getElementById("uiLocations");
//     var estPrice = document.getElementById("uiEstimatedPrice")

//     var url = "http://127.0.0.1:5000/predict_home_price";

//     $.post(url, {
//         SQFT: parseFloat(sqft.value),
//         BEDROOM: bhk,
//         BATHROOM: bath,
//         AREA: locations.value
//     },function(data, status) {
//         console.log(data.estimated_price);
//         estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "<h2>";
//         console.log(status);
//     });
// }

function onclickedEstimatePrice() {
    console.log("Estimate price button clicked");

    // Get input values
    var sqft = document.getElementById("uisqft").value;
    var bath = getBathValue();
    var bhk = getBHKValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    if (!estPrice) {
        console.error("Element uiEstimatedPrice not found!");
        return;
    }

    // var url = "http://127.0.0.1:5000/predict_home_price";
    const BASE_URL = "https://your-backend.vercel.app/predict_home_price";

    // var url = "/api/predict_home_price";

    // Make AJAX request with JSON payload
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",  // Set content type to application/json
        data: JSON.stringify({
            SQFT: parseFloat(sqft),       // Convert square footage to float
            BEDROOM: bhk,                 // Number of bedrooms
            BATHROOM: bath,               // Number of bathrooms
            AREA: location                // Selected area/location
        }),
        success: function(data) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toFixed(2).toString() + "</h2>";
        },
        error: function(error) {
            console.error("Error:", error);
            estPrice.innerHTML = "<h2>Error in predicting price</h2>";
        }
    });
}



function onPageLoad() {
    console.log("document loaded");
    // var url = "http://127.0.0.1:5000/get_location_names";
    const BASE_URL = "https://your-backend.vercel.app/get_location_names";
    // var url = "/api/get_location_names";

    $.get(url, function(data, status) {
        console.log("Response from get_location_names:", data);
        if (data && data.location) {
            var locations = data.location;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear existing options
            locations.forEach(function(loc) {
                var opt = new Option(loc, loc); // Value and display text
                $('#uiLocations').append(opt);
            });
        }
    }).fail(function(error) {
        console.error("Error loading locations:", error);
    });
}

window.onload = onPageLoad;
