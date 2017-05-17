var data_list = [
    [
        { y: 2, x: 0.05 },
        { y: 10, x: 0.15 },
        { y: 300, x: 0.25 },
        { y: 250, x: 0.35 },
        { y: 70, x: 0.45 },
        { y: 270, x: 0.55 },
        { y: 100, x: 0.65 },
        { y: 30, x: 0.75 }
    ],
    [
        { y: 70, x: 0.05 },
        { y: 300, x: 0.15 },
        { y: 25, x: 0.25 },
        { y: 450, x: 0.35 },
        { y: 230, x: 0.45 },
        { y: 490, x: 0.55 },
        { y: 30, x: 0.65 },
        { y: 85, x: 0.75 }
    ]
];

// Toggle the data source
var data = data_list[0];
d3.select('.toggle').on('click', function() {
    data = (data == data_list[0]) ? data_list[1] : data_list[0];
    update();
});

var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Render the main "svg" tag
var svg = d3.select("div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize scales
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
    .domain(data.map(function(d, i) { return d.x } ));

var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 500]);

// Create axis
var xAxis = d3.svg.axis()
    .scale(x)
    .outerTickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(y)
        .tickValues([125, 250, 375, 500])
        .innerTickSize(-width)
        .orient("left");

// Render x-axis to the graph
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height + 1) + ")")
  .call(xAxis);

// Render y-axis to the graph
svg.append("g")
 .attr("class", "y axis")
 .attr("transform", "translate(0,0)")
 .call(yAxis)
.append("text")
 .attr("y", 6)
 .attr("dy", "-2em")
 .style("text-anchor", "end")
 .style("text-anchor", "end");

function update() {
    // Render bars to the graph
    var bars = svg.selectAll(".bar")
        .data(data, function (d, i) {
            return d.x
        });

    bars.enter()
        .append("rect");

    bars.transition()
        .duration(1000)
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return x(d.x);
        })
        .attr('y', function (d, i) {
            return y(d.y)
        })
        .attr("width", x.rangeBand())
        .attr("height", function (d, i) {
            return height - y(d.y);
        });
}