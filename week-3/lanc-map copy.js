//this dataset doesn't have frederick street, maybe i need to work on the query some
d3.json("./lancaster2.geojson").then(function (data) {
  let features = data.features;
  let street = features.filter(function (street) {
    return street.properties.name == "Preston Lancaster Road"
  })[0];
  let margin = 20
  let width = 400
  let height = 400
  
  let projection = d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], street)
  pathGenerator = d3.geoPath().projection(projection)
  mapPath = pathGenerator(street)

  const svg2 = d3.create("svg").attr("width", width).attr("height", height);
  
  // construct the element
  svg2.append('path')
    .datum(street)
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#999999')
    .attr('stroke-width', '2')
  
  // pass to Observable to draw this block
  console.log(svg2)
  return svg2.node()
});
