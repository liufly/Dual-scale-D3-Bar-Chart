var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
        .domain([300, 1100])
        .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// create left yAxis
var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(4)
        .orient("left");

var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.money; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
     .attr("class", "y axis axisLeft")
     .attr("transform", "translate(0,0)")
     .call(yAxis)
    .append("text")
     .attr("y", 6)
     .attr("dy", "-2em")
     .style("text-anchor", "end")
     .style("text-anchor", "end");


  var bars = svg.selectAll(".bar").data(data).enter();

  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.money); })
      .attr("height", function(d,i,j) { return height - y(d.money); });

});

function type(d) {
  d.money = +d.money;
  return d;
}