import trees from "./tree.json" assert { type: "json" };
const margin = 20;
const width = 975;
const height = 610;

d3.json("./LancasterCountyRDCLINE202209.geojson").then(function (data) {
  const lancasterOr = data.features.filter(
    (feature) =>
      feature.properties.LTWNSH === "LANCASTER CITY" ||
      feature.properties.RTWNSH == "LANCASTER CITY"
  );
  const filteredData = {
    type: "FeatureCollection",
    features: lancasterOr,
  };

  const streets = data;
  const cityProjection = d3.geoMercator().fitExtent(
    [
      [margin, margin],
      [width - margin, height - margin],
    ],
    filteredData
  );
  const cityPathGenerator = d3.geoPath().projection(cityProjection);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // construct the path elements using the D3 data join
  svg
    .selectAll("path")
    // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
    .data(streets.features)
    // select all data items that are not represented on the map yet, and add them
    .enter()
    .append("path")
    .attr("d", cityPathGenerator)
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", "0.5");

  const treeElements = svg.selectAll("g").data(trees).join("g");
  const treeGroups = treeElements
    .append("g")
    .attr(
      "transform",
      ({ LONGITUDE, LATITUDE }) =>
        `translate(${cityProjection([LONGITUDE, LATITUDE]).join(",")})`
    );
  treeGroups.append("circle").attr("r", 2);
});
