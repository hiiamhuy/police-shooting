// Function to draw your map
var drawMap = function() {
  // Create map and set view
 var map = L.map('container').setView([40, -97], 4)
  // Create a tile layer variable using the appropriate url
var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
  // Add the layer to your map
 layer.addTo()
  // Execute your function to get data
 getData(map);
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
var data;
$.ajax({
     url:'data/response.json',
     type: "get",
     success:function(dat) {
       data = dat
       // Do something with your data!
     }, 
     dataType:"json"
}) 
  // When your request is successful, call your customBuild function
         customBuild(map)
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(map) {

//Add up the race
	var unknown = new L.LayerGroup();
	var white = new L.LayerGroup();
	var black = new L.LayerGroup();
	var asian = new L.LayerGroup();
	var indian = new L.LayerGroup();
	var islander = new L.LayerGroup();

		for (var i = data.length - 1; i >= 0; i--) {

			var circle = new L.circleMarker([data[i].lat, data[i].lng],
				{
				color: ( (data[i]['Hit or Killed?'] == 'Killed')   ? 'red' : 'black'),
				fillOpacity: 0.5
				}
			).bindPopup(popup());

			var popup = L.popup()
				.setContent(data[i]['Victim Name'] + ' was ' + data[i]['Hit or Killed'] ' in ' + data[i]['State'] ' by ' + data[i]['Agency Name'] + "<br/><br/>" + data[i].Summary);

if (data[i] == 'Native Hawaiian or Other Pacific Islander') {
	circle.addTo(islander);
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
	// Be sure to add each layer to the map
var mapLayers = {
		"Unknown": unknown,
		"White": white,
		"Black or African American": black,
		"Asian": asian,
		"American Indian or Alaska Native": indian,
		"Native Hawaiian or Other Pacific Islander": islander
}
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	L.control.layers(null,mapLayers).addTo(map);

}
}


  
