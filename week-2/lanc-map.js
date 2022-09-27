//this dataset doesn't have frederick street, maybe i need to work on the query some
const margin = 20;
const width = 975;
const height = 610;

d3.json("./lancaster2.geojson")
  .then(function (data) {
    let features = data.features;
    return features.filter(function (street) {
      return street.properties.name == "Preston Lancaster Road";
    })[0];
  })
  .then(function (street) {
    const projection = d3.geoMercator().fitExtent(
      [
        [margin, margin],
        [width - margin, height - margin],
      ],
      street
    );
    const pathGenerator = d3.geoPath().projection(projection);
    const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
    svg
      .append("path")
      .datum(street)
      .attr("d", pathGenerator)
      .attr("fill", "none")
      .attr("stroke", "#999999")
      .attr("stroke-width", "2");
  });
