// import trees from "./tree.json" assert { type: "json" };
import trees from "./tree-subset.json" assert { type: "json" };

const margin = 20;
const width = screen.width;
const height = screen.height;

const streetData = await d3.json("./LancasterCountyRDCLINE202209.geojson");

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

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// construct the path elements using the D3 data join
// svg
//   .selectAll("path")
//   // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
//   .data(streetData.features)
//   // select all data items that are not represented on the map yet, and add them
//   .enter()
//   .append("path")
//   .attr("d", cityPathGenerator)
//   .attr("fill", "none")
//   .attr("stroke", "#000000")
//   .attr("stroke-width", "0.5");

const treeElements = svg.selectAll("g").data(trees).join("g");
const treeGroups = treeElements
  .attr(
    "transform",
    ({ LONGITUDE, LATITUDE }) =>
      `translate(${cityProjection([LONGITUDE, LATITUDE]).join(",")})`
  )

treeGroups
  .append("rect")
  .attr("width", 120)
  .attr("height", 30)
  .attr("stroke", "black")
  .attr("fill", "white")
  .attr("class", "treeLabel")
  .attr("id", (d) => "rect-id-" + d.OBJECTID);

treeGroups
  .append("text")
  .text((d) => d.SPECIES_CO.split(",").reverse().join(" "))
  .attr("dx", 15)
  .attr("dy", 20)
  .attr("class", "treeLabel")
  .attr("id", (d) => "text-id-" + d.OBJECTID);

treeGroups.append("circle").attr("r", 11).on("click", click);

// treeGroups
//   .append("rect")
//   .attr("width", d => d.SPECIES_CO.length * 10)
//   .attr("height", 30)
//   .attr("stroke", "black")
//   .attr("fill", "white")
//   .attr("class", "treeLabel")
//   .attr("id", d => "rect-id-" + d.OBJECTID);

// const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
// svg.call(zoom);

function click(event, d) {
  console.log("Click!");
  const treeName = d.SPECIES_CO.split(",").reverse().join(" ");
  resetLabelsToBeHidden();
  d3.select("#text-id-" + d.OBJECTID).style("opacity", 1);
  d3.select("#rect-id-" + d.OBJECTID).style("opacity", 1);
  // svg.append("text").text(treeName).attr("x", x).attr("y", y);

  // svg
  //   .append("text")
  //   .attr("x", x)
  //   .attr("y", y)
  //   .attr("dy", "-.35em")
  //   .attr("dx", ".35em")
  //   .text("HERE");
  // .text(function (d) {
  //   return d;
  // });
}

function resetLabelsToBeHidden() {
  d3.selectAll(".treeLabel").style("opacity", 0);
  console.log("Done resetting");
}

function zoomed({ transform }) {
  // console.log(transform);
  // svg.attr("transform", transform);
  // svg.attr("stroke-width", 1 / transform.k);
}

// svg.append("text").text("This is text").attr("x", 20).attr("y", 20);
