var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          // .domain(['5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00','1:00','2:00','3:00','4:00'])
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("./uberStudy.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.uber = +d.uber;
    d.taxi = +d.taxi;
    console.log(d.uber);
    console.log(d.taxi);
  });
  console.log(data)
  var dataLenght=data.length;
  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.salesperson; }));
  y.domain([d3.min(data, function(d){ return d.taxi}), d3.max(data, function(d) { return d.uber; })]);
  // console.log(d.uber)
  // console.log(d.taxi)
  //append the rectangles for the bar chart
  svg.selectAll(".bar-u")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar-u")
      .attr("x", function(d,i) { return x.bandwidth()/data.length*i+0.5; })
      .attr("width", x.bandwidth()/data.length-5)
      .attr("y", function(d) { return y(d.uber); })
      .attr("height", function(d) { return height - y(d.uber) - height/2; });

svg.selectAll(".bar-t")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar-t")
      .attr("x", function(d,i) { return x.bandwidth()/data.length*i+0.5; })
      .attr("width", x.bandwidth()/data.length-5)
      .attr("y", function(d) { return height/2; })
      .attr("height", function(d) { return Math.abs(height - y(d.taxi) - height/2); });

svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 8)
      .attr("cy", function(d,i) { return y(d.uber+d.taxi) })
      .attr("cx", function(d,i) { return x.bandwidth()/data.length*i+13;}); 
      // .attr("x", function(d,i) { return x.bandwidth()/data.length*i+0.5; })
      // .attr("width", x.bandwidth()/data.length-5)
      // .attr("y", function(d) { return height/2; })
      // .attr("height", function(d) { return Math.abs(height - y(d.taxi) - height/2); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height/2 + ")")
      .call(d3.axisBottom(x)); 

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
