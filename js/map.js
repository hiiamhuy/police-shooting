// Function to draw your map
var drawMap = function() {
    // Create map and set view
    var map = L.map("mapDiv").setView([40, -97], 4);
    // Create a tile layer variable using the appropriate url
    // Add the layer to your map
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    // Execute your function to get data
    getData(map);
};

// Function for getting data
var getData = function(map) {
    // Execute an AJAX request to get the data in data/response.js
    var data;
    $.ajax({
        url: 'data/response.json',
        type: "get",
        success: function(dat) {
        	data = dat
            // Do something with your data!
        },
        dataType: "json"
    });
    // When your request is successful, call your customBuild function
    customBuild(map, data);
};

// Loop through your data and add the appropriate layers and points
var customBuild = function(map, data) {

    //Add up the race
    var unknown = new L.LayerGroup();
    var white = new L.LayerGroup();
    var black = new L.LayerGroup();
    var asian = new L.LayerGroup();
    var indian = new L.LayerGroup();
    var islander = new L.LayerGroup();

    var islanderKilled = 0,
    	islanderHit = 0,
    	indianKilled = 0,
    	indianHit = 0,
    	asianKilled = 0,
    	asianHit = 0,
    	blackKilled = 0,
    	blackHit = 0,
    	whiteKilled = 0,
    	whiteHit = 0,
    	unknownKilled = 0,
    	unknownHit = 0;
    	
    for (var i = data.length - 1; i >= 0; i--) {

        var circle = new L.circleMarker(data[i].lat, data[i].lng, fillColor(data[i]['Hit or Killed?'] == 'Killed') ? 'red' : 'black').bindPopup("Victim Name:" + data[i]['Victim Name'] +
            ' was ' + data[i]['Hit or Killed'] + ' in ' + data[i].State + ' by ' + data[i]['Agency Name'] + "<br/><br/>" + data[i].Summary);

        if (data[i] == 'Native Hawaiian or Other Pacific Islander') {
            circle.addTo(islander);
            	if (data[i]['Hit or Killed'] == 'Killed') {

            	};
        } else if (data[i] == 'White') {
            circle.addTo(white);
        } else if (data[i] == 'Black or African American') {
            circle.addTo(black);
        } else if (data[i] == 'Asian') {
            circle.addTo(asian);
        } else if (data[i] == 'American Indian or Alaska Native') {
            circle.addTo(indian);
        } else { //if (data[i] == 'Unknown') {
            circle.addTo(unknown);
        }
    }
    // Be sure to add each layer to the map
    unknown.addTo(map);
    white.addTo(map);
    black.addTo(map);
    asian.addTo(map);
    indian.addTo(map);
    islander.addTo(map);

    var mapLayers = {
        "Unknown": unknown,
        "White": white,
        "Black or African American": black,
        "Asian": asian,
        "American Indian or Alaska Native": indian,
        "Native Hawaiian or Other Pacific Islander": islander
    }
    // Once layers are on the map, add a leaflet controller that shows/hides layers
    //	L.control.layers(null,mapLayers).addTo(map);
};
