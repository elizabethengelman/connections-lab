import trees from "../data/tree.json" assert { type: "json" };

const margin = 100;
const width = screen.width;
const height = screen.height;

const streetData = await d3.json("../data/LancasterCountyRDCLINE202209.geojson");

const lancasterOr = streetData.features.filter(
  (feature) =>
    feature.properties.LTWNSH === "LANCASTER CITY" ||
    feature.properties.RTWNSH == "LANCASTER CITY"
);

const filteredData = {
  type: "FeatureCollection",
  features: lancasterOr,
};

const cityProjection = d3.geoMercator().fitExtent(
  [
    [margin, margin],
    [width - margin, height - margin],
  ],
  filteredData
);
const cityPathGenerator = d3.geoPath().projection(cityProjection);

const svg = d3.select("svg").attr("width", width).attr("height", height);

// construct the path elements using the D3 data join
svg
  .selectAll("path")
  // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
  .data(streetData.features)
  // select all data items that are not represented on the map yet, and add them
  .enter()
  .append("path")
  .attr("d", cityPathGenerator)
  .attr("fill", "none")
  .attr("stroke", "#632a00")
  .attr("stroke-width", "0.5");

const treeElements = svg.selectAll("g").data(trees).join("g");
const treeGroups = treeElements.attr(
  "transform",
  ({ LONGITUDE, LATITUDE }) =>
    `translate(${cityProjection([LONGITUDE, LATITUDE]).join(",")})`
);

treeGroups
  .append("circle")
  .attr("fill", function (d) {
    if (d.SPECIES_CO.includes("Pine")) {
      return "#4f6611";
    } else if (d.SPECIES_CO.includes("Maple")) {
      return "#4f6611";
    } else if (d.SPECIES_CO.includes("Oak")) {
      return "#4f6611";
    } else {
      return "#224214";
    }
  })
  .attr("r", 3)
  .attr("id", (d) => "circle-id-" + d.OBJECTID)
  .on("click", click);

function resetPreviousSelection() {
  d3.selectAll(".treeLabel").remove();
}

function click(event, d) {
  resetPreviousSelection();
  const selectedCircle = d3.select("#circle-id-" + d.OBJECTID);
  const circleParent = selectedCircle.select(function () {
    return this.parentNode;
  });

  circleParent.raise();

  var treeName = d.SPECIES_CO.split(",").reverse().join(" ").trimStart();
  circleParent
    .append("text")
    .text(treeName)
    .attr("dx", 15)
    .attr("dy", -20)
    .attr("class", "treeLabel")
    .attr("id", "text-id-" + d.OBJECTID);

  circleParent
    .append("rect")
    .attr("fill", "white")
    .attr("x", 15)
    .attr("y", -40)
    .attr("rx", 4)
    .attr("height", 30)
    .attr("width", 120)
    .attr("class", "treeLabel")
    .attr("id", "rect-id-" + d.OBJECTID)
    .lower();
}

//
// const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
// svg.call(zoom);

function zoomed({ transform }) {
  // console.log(transform);
  // svg.attr("transform", transform);
  // svg.attr("stroke-width", 1 / transform.k);
}
