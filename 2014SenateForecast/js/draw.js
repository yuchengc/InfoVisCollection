var data = []; // the variable that holds the data from csv file

var margin = { top: 20, right: 20, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scaleBand()
	    .range([0, width])
    	

var y = d3.scaleLinear()
    // .domain([106, d3.max(data, function (d) { return d.oldestAge + d.duration+1; })])
    
    .range([height, 0]);



$(document).ready(function () {
	loadData();
	
});

const loadData=()=> {
	// var dateFormat = d3.timeParse("%x");
	// var duration = 
	var i = 0;
	d3.csv("data/data.csv", function(d) {         
		data = d;   

		data.forEach(function (item) {
			item.seats = parseInt(item.seats);
			item.results = parseFloat(item.results); 
		});
		SetInfrustrature()
		drawBarChart();
		console.log(data);
		   
	}); 

}

const SetInfrustrature= ()=>{
	console.log("SetInfrustrature")
    x.domain(data.map(d=>d.seats))
    .padding(0.1);

    y.domain([0,  d3.max(data, d=>d.results)+1]);
}

const drawBarChart=()=>{
	var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
        .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
	


	const make_x_gridlines=()=>{
    	// console.log("x-grid bottom", d3.axisBottom(x))
    	return d3.axisBottom(x).ticks(data.lenght)
    }
    const make_y_gridlines=()=>{		
	    return d3.axisLeft(y).ticks(parseInt(d3.max(data, d=>d.results)+1))
	}

    y.domain([0,  d3.max(data, d=>d.results)+1]);
	console.log("enter drawing")

	// add the X gridlines    
    svg.append("g")			
        .attr("class", "grid-x")
        .attr("transform", "translate("+x.bandwidth()/2+","+ height +")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )
    // add the X Axis
  	svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("line")
        .attr("opacity","0");


    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid-y")
        .attr("transform", "translate("+x.bandwidth()/2+", 0)")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
    	) 

	// add the Y Axis
    svg.append("g")
    .attr("transform", "translate("+x.bandwidth()/2+", 0)")
        .call(d3.axisLeft(y));   


	svg.append("defs")
		.append("pattern")
		.attr("id","innerPattern")
		.attr("x","0")
		.attr("y","0")
		.attr("width","6")
		.attr("height","6")
		.attr("patternUnits","userSpaceOnUse")
	var pattern = svg.selectAll("pattern");

	pattern.append("rect")
		.attr("x","0")
		.attr("y","0")
		.attr("width","3")
		.attr("height","3")
		.attr("stroke", "none")
		.attr("fill", "#222")
	pattern.append("rect")
		.attr("x","3")
		.attr("y","0")
		.attr("width","3")
		.attr("height","3")
		.attr("stroke", "none")
		.attr("fill", "#fff")
	pattern.append("rect")
		.attr("x","0")
		.attr("y","3")
		.attr("width","3")
		.attr("height","3")
		.attr("stroke", "none")
		.attr("fill", "#fff")

	pattern.append("rect")
		.attr("x","3")
		.attr("y","3")
		.attr("width","3")
		.attr("height","3")
		.attr("stroke", "none")
		.attr("fill", "#222")

	svg.append("g")
		.attr("class","bargroup")
	var bargroup = svg.selectAll(".bargroup")
	var bar= bargroup.selectAll(".bar")
        .data(data)
        .enter()
	    .append("rect")
        .attr("class", "bar")
        // .attr("fill","blue")
        .attr("x", d=>x(d.seats))
        .attr("y", d=>y(d.results))
        .attr("width", x.bandwidth()-3)
        .attr("height", (d)=>{
            return height-y(d.results)})
        .attr("fill",  "url(#innerPattern)")
        .attr("stroke","#111")
        .attr("stroke-width","1")
        .on("mousemove", function(d){
        	d3.select(this).attr("fill","#111")
        })
        .on("mouseout", function (d){
        	d3.select(this).attr("fill","url(#innerPattern)")
        })


}