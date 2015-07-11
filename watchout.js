// start slingin' some d3 here.

var svgArea = d3.select("body").append("svg")
.attr("width", 900)
.attr("height", 600);

var enemyRadii = [];
//create array with all attributes of enemy
for(var i = 0; i < 25; i++){
  var x = Math.floor(Math.random() * 800) + 10;
  var y = Math.floor(Math.random() * 500) + 10;
  var r = 10;
  enemyRadii.push([r, x, y]);
}

var randomX = function(){
  return Math.floor(Math.random() * 800) + 10;
}

var randomY = function(){
  return Math.floor(Math.random() * 500) + 10;
}

var randomDelay = function(){
  return Math.floor(Math.random() * 1000);
}

var randomDuration = function(){
  return Math.floor(Math.random() * 3000);
}


var test = svgArea.append("circle")
  .attr("cx", 25).attr("cy", 25).attr("r", 25)
  .style("fill", "red")
  .on("mouseenter", mouseEnter);


function mouseEnter(){
  test.transition().style("fill","green");
}

function looper(){
var enemies = svgArea.selectAll("circle")
  .data(enemyRadii)
  .enter()
  .append("circle")
  .attr("r", function(d){ return d[0]; }) //returns radii in array
  .attr("cx", function(d){ return d[1]; })
  .attr("cy", function(d){ return d[2]; })
  .style("fill", "red");
  repeat();

  function repeat(){
    enemies
      .transition()
      .delay(randomDelay)
      .duration(2000)
      //.ease("elastic")
      .attr("cx", randomX)
      .attr("cy", randomY)
      .each("end",repeat);
  }
}

looper();

//transition for enemies for weaving motion
//duration()
//attribute moving from x to y (cx/cy)
// y to x

//var enemies = svgArea.append("circle")
  // .attr("cx", 25).attr("cy", 25).attr("r", 25)
  // .style("fill", "red")
  // .transition()
  // .duration(2000)
  // .style("fill", "magenta")
  // .attr("cx", 300)
  // .attr("cy", 300);