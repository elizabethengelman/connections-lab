//this dataset doesn't have frederick street, maybe i need to work on the query some
const margin = 20;
const width = 975;
const height = 610;

d3.json("./lancaster2.geojson")
  .then(function (data) {
    const streets = data
    // const projection = d3.geoMercator().fitExtent(
    //   [
    //     [margin, margin],
    //     [width - margin, height - margin],
    //   ],
    //   street
    // );
    // const pathGenerator = d3.geoPath().projection(projection);
    // const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
    // svg
    //   .append("path")
    //   .datum(street)
    //   .attr("d", pathGenerator)
    //   .attr("fill", "none")
    //   .attr("stroke", "#999999")
    //   .attr("stroke-width", "2");




    const cityProjection = d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], streets)
    const cityPathGenerator = d3.geoPath().projection(cityProjection);
   
    const svg2 = d3.select("body").append("svg").attr("width", width).attr("height", height);
  
    // construct the path elements using the D3 data join
    svg2.selectAll('path')
      // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
      .data(streets.features)
      // select all data items that are not represented on the map yet, and add them
    .enter()
      .append('path')
      .attr('d', cityPathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#999999')
      .attr('stroke-width', '0.5')
  });
