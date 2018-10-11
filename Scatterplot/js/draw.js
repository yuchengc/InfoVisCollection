var data = []; // the variable that holds the data from csv file

var margin = { top: 20, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scaleLinear()
	    .range([0, width])
    	

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal()
    .range(["#EC4025", "#F29884", "#F7CCC2", "#79B1D1", "#378ECF"]);

const generateData =(num) =>{
	let x = 50, y = 50
	let tempArray=[]
	for(var i=0;i<num; i++){
		let womenD= y+(Math.random() * (2.8 - (-1.0) + 1)) + (-1.0);
		y=y+(Math.random() * 0.7)
		let menD= x+(Math.random() * (2.0 - (-2.3) + 1)) + (-2.3);
		x=x+(Math.random() * 0.7)
		tempArray.push({women:womenD,men:menD})
	}
	console.log(tempArray)
	return tempArray
	// tempArray.push()
}
data=generateData(100)

$(document).ready(function () {
	drawScatterplot();
	
});
const drawScatterplot=()=>{
	var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
        .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    x.domain([45, d3.max(data, d=>d.men)]);

    y.domain([45, d3.max(data, d=>d.women)]);

    const make_x_gridlines=()=>{
    	console.log("x-grid bottom", d3.axisBottom(x))
    	return d3.axisBottom(x).ticks(Math.floor(d3.max(data, d=>d.men)-45)/5)
    }
    const make_y_gridlines=()=>{		
	    return d3.axisLeft(y).ticks(Math.floor(d3.max(data, d=>d.women)-45)/5)}

    // add the X gridlines    
    svg.append("g")			
        .attr("class", "grid-x")
        .attr("transform", "translate(0,"+ height +")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )
        .selectAll("line")
        .attr("stroke","#ccc")
        .attr("stroke-dasharray","3")

    svg.selectAll(".grid-x")
	    .selectAll("path")
        .attr("opacity","0")
    // add the X Axis
  	svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("path")
        .attr("opacity","0");

    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid-y")
        .attr("transform", "translate(0, 0)")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
    	) 
    	.selectAll("line")
        .attr("stroke","#ccc")
        .attr("stroke-dasharray","3")
    svg.selectAll(".grid-y")
	    .selectAll("path")
        .attr("opacity","0")
	// add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("path")
        .attr("opacity","0");   


    var circle=svg.selectAll("circle")
    	.data(data)
    	.enter()
    	.append("circle")
		.attr("r", "2")
		.attr("cx", d=>{
			// console.log("c x1",d.index,x(d.passAwayDate))
			return x(d.men)
		})
		.attr("cy",d=>{
			// console.log("c y2",d.index,y(d.oldestAge + d.duration))
			return y(d.women)
		})
		.attr("fill","#0099CC")

}