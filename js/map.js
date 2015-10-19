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
            customBuild(map, data)
        },
        dataType: "json"
    });
    // When your request is successful, call your customBuild function
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

    var islanderKilled = 0;
    var islanderHit = 0;
    var indianKilled = 0;
    var indianHit = 0;
    var asianKilled = 0;
    var asianHit = 0;
    var blackKilled = 0;
    var blackHit = 0;
    var whiteKilled = 0;
    var whiteHit = 0;
    var unknownKilled = 0;
    var unknownHit = 0;

    for (var i = data.length - 1; i >= 0; i--) {
        //draw points and fill data bubble
        var circle = new L.circleMarker([data[i].lat, data[i].lng], {
            fillColor: (data[i]['Hit or Killed?'] == 'Killed') ? 'red' : 'black'
        }).bindPopup("Victim Name: " + data[i]['Victim Name'] +
            ' was ' + data[i]['Hit or Killed?'] + ' in ' + data[i].State + ' by ' + data[i]['Agency Name'] + "<br/><br/>" + data[i].Summary);
        //adding up killed and hits/unknown as well as filling up layers
        if (data[i]['Race'] == 'Native Hawaiian or Other Pacific Islander') {
            circle.addTo(islander);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                islanderKilled++;
            } else {
                islanderHit++;
            }
        } else if (data[i]['Race'] == 'White') {
            circle.addTo(white);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                whiteKilled++;
            } else {
                whiteHit++;
            }
        } else if (data[i]['Race'] == 'Black or African American') {
            circle.addTo(black);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                blackKilled++;
            } else {
                blackHit++;
            }
        } else if (data[i]['Race'] == 'Asian') {
            circle.addTo(asian);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                asianKilled++;
            } else {
                asianHit++;
            }
        } else if (data[i]['Race'] == 'American Indian or Alaska Native') {
            circle.addTo(indian);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                indianKilled++;
            } else {
                indianHit++;
            }
        } else if (data[i]['Race'] == 'Unknown') {
            circle.addTo(unknown);
            if (data[i]['Hit or Killed?'] == 'Killed') {
                unknownKilled++;
            } else {
                unknownHit++;
            }
        }
    }
    // Be sure to add each layer to the map
    // unknown.addTo(map);
    //  white.addTo(map);
    //  black.addTo(map);
    // asian.addTo(map);
    // indian.addTo(map);
    // islander.addTo(map);
    var mapLayers = {
            "Unknown": unknown,
            "White": white,
            "Black or African American": black,
            "Asian": asian,
            "American Indian or Alaska Native": indian,
            "Native Hawaiian or Other Pacific Islander": islander
        }
        // Once layers are on the map, add a leaflet controller that shows/hides layers
    L.control.layers(null, mapLayers).addTo(map);
    //table
    $("#blackHit").text(blackHit);
    $("#blackKilled").text(blackKilled);
    $("#whiteHit").text(whiteHit);
    $("#whiteKilled").text(whiteKilled);
};