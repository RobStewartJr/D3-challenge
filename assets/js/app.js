// // @TODO: YOUR CODE HERE!

var svgWidth = 690;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read data
d3.csv("assets/data/data.csv")
  .then(function(metrics) {
  	console.log()

    metrics.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.state = +data.state;      
    });

    // Scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(metrics, d => d.poverty)-1, d3.max(metrics, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(metrics, d => d.healthcare)-1, d3.max(metrics, d => d.healthcare)])
    .range([height, 0]);

    // Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(metrics)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", "1.0");

     var abbrGroup = chartGroup.selectAll("label")
    .data(metrics)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("font-size",9)
    .attr("font-weight","bold")
    .attr("fill", "white")
    .attr("x", d => xLinearScale(d.poverty)-7)
    .attr("y", d => yLinearScale(d.healthcare)+4);
   
     // Axis labels
     chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 1.5))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Lacks Healthcare (%)");
 
     chartGroup.append("text")
     .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
     .attr("class", "axisText")
     .text("In Poverty (%)");
  });