const margin = 20;
const width = 975;
const height = 610;

d3.json("../data/lancaster2.geojson").then(function (data) {
  const streets = data.features;
  const street = streets[0];
  const projection = d3.geoMercator().fitExtent(
    [
      [margin, margin],
      [width - margin, height - margin],
    ],
    street
  );
  const pathGenerator = d3.geoPath().projection(projection);
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  svg
    .append("path")
    .datum(street)
    .attr("d", pathGenerator)
    .attr("fill", "none")
    .attr("stroke", "#999999")
    .attr("stroke-width", "2");
});
