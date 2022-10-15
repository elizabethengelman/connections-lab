# Arboreal Neighbors
My first thought when I was aiming to create a project based on data was to use data about my local environment. I'm a transplant to Lancaster, PA and I love the idea of engaging with my new community through data. I started by Googling "lancaster open data" and found the city's [open data department website](https://lancaster-pa.maps.arcgis.com/apps/PublicGallery/index.html?appid=da5710fc4943428698cf5f186de4377b), which include a couple of example projects. A lot of the existing projects are maps, which I find inherenly quite beautiful, and on top of that they had data about trees! Walking around my city taking in the surroundings is one of my favorite activities, and getting the chance to learn more about my tree neighbors seemed like a perfect data set to start with.

I had intiailly hoped to create an immersive experience where the user could pan through a series of trees that were nearby on a street level. For a couple of reasons, I decided to start with plotting trees on a map of the city instead dropping down to the street level:
* Firstly, all of my initial audience (my classmates, resisdents and professor) do not live in Lancaster! So if I wanted to display the trees close to them, I would either need to include a _very large_ data set of maps, or include a default section to display. 
* The data I had access to from Lancaster city includes the trees' longitude, latitude, the address, and the type of the tree. In order to allow the user to be on ground-level with the trees, I would need a visual representation of the tree itself. And though it would be so interesting to have images or illustrations of the trees for the user to "walk" through, I didn't think it was a feasible goal in the time frame.
* I realized that in order to plot trees based on their latitude and longitude, I would need some sort of framework that is smart enough to deal with longitude and latitude coordinates - this seemed like a great job for a mapping or data visualization library. And once I learned more about D3.js, it seemed like in order to create my ground-level walk through, I should first start with a higher level map view to get the structure in place and learn about the tooling.
* I also love maps! So, once I saw [this](https://lancaster-pa.maps.arcgis.com/apps/View/index.html?appid=2f1ca18840d74a9bad523d785ccdfaed), I figured it would be a great thing to emulate, but with my own spin.


I first worked to first understand a bit more about how to create a map in D3.js in general, and found this tutorial particularly helpful: https://www.youtube.com/watch?v=hrJ64jpYb0A. This gave me a foundation for createing a map from geojson data, and plotting points (state capitals on it). Geojson is data structure based on json that supports encoding for geometry types such as points, lines, polygons, etc. These shapes are all combined to create a map.

Then I moved into trying to get Lancaster city data in order to plot the given map, and I learned that a lot of geojson is openly available via OpenStreetMap data, and https://overpass-turbo.eu/ is a way to query that data. After a bunch of struggle, I thought that I got the Lancaster data I needed. But when I went to plot the map, I ended up with several circles on the page: https://elizabethengelman.com/connections-lab/week-3/ (scroll down to the bottom). After a bit of confusion, I decided to take another look at my data, and realized that this data was incorrect! It wasn't just data from Lancaster, PA, but also included data from any street all over the world that had Lancaster in the name. After realizing this, I threw in the towel with OpenStreetMap and again turned to Google. I now knew that geojson was the data type I was looking for, and so I searched for "lanacaster pa geojson" and lo and behold, that data is online too!
https://mapservices.pasda.psu.edu/server/rest/services/pasda/LancasterCounty/MapServer

## Next Steps
* Allow users to upload images of specific trees they visit
* Provide images of trees
* Allow a user to mark which trees they've visited
* Enabled zooming and panning
* Make sure the site is responsive
* Make sure the site is mobile friendly

## References:

I ended up visting a lot of resources in learning about D3 in general, and creating maps specifically. 
* https://medium.datadriveninvestor.com/getting-started-with-d3-js-maps-e721ba6d8560
* https://www.tutorialsteacher.com/d3js/create-svg-elements-in-d3js
* https://www.d3indepth.com/geographic/
* https://nominatim.openstreetmap.org/search.php?city=Lancaster&state=Pennsylvania&format=jsonv2
* https://bl.ocks.org/Andrew-Reid/4f3e3cdf708036ed076075b937357826
* https://gist.github.com/JamesChevalier/b861388d35476cee4fcc3626a60af60f
* https://stackoverflow.com/questions/62333032/lets-make-a-topojson-map-and-view-it-with-d3-js
* https://github.com/topojson/topojson
* https://github.com/d3/d3-geo#projections
* https://www.tutorialsteacher.com/d3js/create-svg-elements-in-d3js
* http://using-d3js.com/05_01_paths.html
* https://www.d3indepth.com/geographic/
* https://bost.ocks.org/mike/map/
* https://analyticsindiamag.com/a-map-to-perfection-using-d3-js-to-make-beautiful-web-maps/
* https://stackoverflow.com/questions/47750168/d3-us-map-zoom-on-load-to-marked-state
* https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
* https://codepen.io/andybarefoot/pen/oBQKOb
* https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee
* https://www.d3indepth.com/zoom-and-pan/
* https://mapservices.pasda.psu.edu/server/rest/services/pasda/LancasterCounty/MapServer
* https://www.pasda.psu.edu/uci/DataSummary.aspx?dataset=1267
* this one called "Lancaster County - Road Centerlines and Types": https://www.pasda.psu.edu/uci/DataSummary.aspx?dataset=1270