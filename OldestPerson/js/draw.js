let CHART_WIDTH = 600;
let CHART_HEIGHT = 600;

var data = []; // the variable that holds the data from csv file



$(document).ready(function () {
	loadData();
	
});

const loadData=()=> {
	var dateFormat = d3.timeParse("%x");
	// var duration = 
	var i = 0;
	d3.csv("data/data.csv", function(d) {         
		data = d;   

		data.forEach(function (item) {
			item.dateBeOldest = dateFormat(item.dateBeOldest);
			item.passAwayDate = dateFormat(item.passAwayDate);  
			item.oldestAge = parseFloat(item.oldestAge);   
			item.duration = (d3.timeDay.count(item.dateBeOldest,item.passAwayDate))/365;
			item.index=i;
			i++;

		});
		drawLineChart();
		console.log(data);
		   
	}); 

}

const drawLineChart = () =>{
	var margin = { top: 20, right: 20, bottom: 30, left: 60 },
        width = 600 - margin.left - margin.right,
	    height = 600 - margin.top - margin.bottom;
    var mindate = new Date(1950,1,1),
        maxdate = new Date(2018,9,31);

    var x = d3.scaleTime()
	    .range([0, width])
	    // .domain(d3.extent(data))
	    // .domain(d3.extent(data.map(function (d) { return d.passAwayDate; })));
    	.domain([mindate, maxdate]);

    var y = d3.scaleLinear()
        // .domain([106, d3.max(data, function (d) { return d.oldestAge + d.duration+1; })])
        .domain([106,  123])
        .range([height, 0]);
    const make_x_gridlines=()=>{
    	console.log("x-grid bottom", d3.axisBottom(x))
    	return d3.axisBottom(x).ticks(6)
    }
    const make_y_gridlines=()=>{		
	    return d3.axisLeft(y).ticks(17)
}


    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
        .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    

	// add the X gridlines    
    svg.append("g")			
        .attr("class", "grid-x")
        .attr("transform", "translate(0,"+ height +")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )
    // add the X Axis
  	svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid-y")
        .attr("transform", "translate(0, 0)")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
    	) 

	// add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));   


    svg.append("g")
        .attr("class", "linegroup")
        .attr("transform",
        "translate(" + "0" + "," + "0" + ")");



    var linegroup=d3.select(".linegroup")

    // var linePoint=d3.selectAll(".linePoint")
	   //  .data(data)
	   //  .enter()
	   //  .append("g")
	   //  .attr("class", "linePoint")


    var g = linegroup.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("transform", "translate(0, 0)")


	g.append("line")
	.attr("class", function(d){
		return "subline"+d.index.toString()
	})
	.attr("x2", function(d){
		console.log("x1",d.index,x(d.dateBeOldest))
		return x(d.dateBeOldest)
	})
	.attr("y2", d=>{
		console.log("y1",d.index,y(d.oldestAge))
		return y(d.oldestAge)
	})
	.attr("x1", d=>{
		// console.log("x2",d.index,x(d.passAwayDate),d.Name)
		console.log("x2",d.index,x(d.passAwayDate))
		return x(d.passAwayDate)
	})
	.attr("y1", d=>{
		console.log("y2",d.index,y(d.oldestAge + d.duration))
		return y(d.oldestAge + d.duration)
	})
	.attr("stroke", "#0099CC")
	.attr("stroke-width", "2");
// svg.seletAll("g")
// svg.selectAll("g")
// 	.data(data)
// 	.enter()
// 	.append("g")
	g.append("circle")
	.attr("r", "4")
	.attr("cx", d=>{
		// console.log("c x1",d.index,x(d.passAwayDate))
		return x(d.passAwayDate)
	})
	.attr("cy",d=>{
		// console.log("c y2",d.index,y(d.oldestAge + d.duration))
		return y(d.oldestAge + d.duration)
	})
	.attr("fill","#0099CC")



    

}
