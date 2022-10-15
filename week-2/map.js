const width = 975;
const height = 610;
import data from "../data/data.json" assert { type: "json" };
import us from "../data/us.json" assert { type: "json" };

const path = d3.geoPath();
const svg = d3.create("svg").attr("width", width).attr("height", height);
const projection = d3
  .geoAlbersUsa()
  .scale(1300)
  .translate([width / 2, height / 2]);

const statesBackground = svg
  .append("path")
  .attr("fill", "#ddd")
  .attr("d", path(topojson.feature(us, us.objects.nation)));

const statesBorders = svg
  .append("path")
  .attr("fill", "none")
  .attr("stroke", "#fff")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

const stateCapitalElements = svg.selectAll("g").data(data).join("g");

const capitalGroups = stateCapitalElements
  .append("g")
  .attr(
    "transform",
    ({ longitude, latitude }) =>
      `translate(${projection([longitude, latitude]).join(",")})`
  );

capitalGroups.append("circle").attr("r", 2);

capitalGroups
  .append("text")
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .attr("y", -6)
  .text(({ description }) => description);

document.body.appendChild(svg.node());
