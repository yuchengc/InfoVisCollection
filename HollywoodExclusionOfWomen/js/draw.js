var data = []; // the variable that holds the data from csv file

var margin = { top: 20, right: 150, bottom: 30, left: 60 },
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scaleBand()
	    .range([0, width])
    	

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal()
    .range(["#EC4025", "#F29884", "#F7CCC2", "#79B1D1", "#378ECF"]);

var stack = d3.stack()
    .offset(d3.stackOffsetExpand);

const label=
	{nowomen: "Fewer than two women",
	notalk: "Women don't talk to each other",
	men: "Women only talk about men",
	dubious: "Dubious",
	ok: "Passes Bechdel Test"}

$(document).ready(function () {
	loadData();
	
});

const loadData=()=> {
	var i = 0;
	d3.csv("data/data.csv", function(d) {         
		data = d;   

		data.forEach(function (item) {
			item.cleanTest = item.cleanTest;
			item.year = parseFloat(item.year); 
			item.recordPercentage = parseFloat(item.recordPercentage); 
		});
		drawBarChart();
		console.log(data);
		   
	}); 

}
const drawBarChart=()=>{

	//NEST DATA
	var resultByYear = d3.nest()
		.key(d=>d.year)
		.entries(data)

	console.log(resultByYear)

	var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
        .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
    x.domain(resultByYear.map(d=>d.key))
    .padding(0.1)
    .align(0.1);

    y.domain([0, 100]);

    color.domain(resultByYear[0]["values"].map((d)=>{
    	return d.cleanTest
    }))

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("line")
        .attr("opacity","0");

    svg.append("g")
    .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(y));
    var seriebar = svg.selectAll(".seriebar")
		    // .data(datay.values.map(d=>d.recordPercentage))
		    .data(resultByYear)
		    .enter().append("g")
	        .attr("class",  (d)=>{return "seriebar"+d.key.toString()})

    resultByYear.forEach((datay,i)=>{
    	// console.log("nest")
    	var bar = svg.selectAll(".seriebar"+datay.key)
    	var previousPoint = 0;
    
	    subbar=bar.selectAll(".subbar")
	    .data(datay.values)
	    .enter().append("rect")
        .attr("class", "subbar")
        .attr("x", (d)=>{
        	// console.log()
        	return x(d.year)})
        .attr("y", function(d) { 
        	var temp=height-y(previousPoint)
        	previousPoint=previousPoint+d.recordPercentage;
        	return temp})
        .attr("height", 
        	// (d)=>{return height-y(d.recordPercentage)})
        	function(d) { 
        	var subheight=y(d.recordPercentage);
        	// previousPoint=d.recordPercentage
        	return height-subheight;
        })
        .attr("width", x.bandwidth())
        .attr("fill",d=>color(d.cleanTest));
	    
	    if(i == resultByYear.length-1){

	    	var previousTextH = 0;
	    	// svg.append("g")
	    	var TextLadel=svg.append("g")
	    		.attr("class","ladel")
	    		.append("g")
	    		.selectAll("text")
	    		.data(datay.values)
	    		.enter()
	    		.append("text")
	    		.text(d=>label[d.cleanTest])
	    		.attr("x", width+10)
	    		.attr("y", function(d) { 
		        	var temp=height-y(previousTextH)
		        	previousTextH=previousTextH+d.recordPercentage;
		        	var barheight=height-y(d.recordPercentage)
		        	return temp+(barheight/2)})

	    }

	    }
    )

}