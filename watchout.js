// start slingin' some d3 here.
var collisions = 0, score = 0, highScore = 0;

var svgArea = d3.select("body").append("svg")
.attr("width", 900)
.attr("height", 600);

var borderPath = svgArea.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 600)
  .attr("width", 900)
  .style("stroke", "black")
  .style("fill", "none")
  .style("stroke-width", "1");


var enemyRadii = [];

//create array with all attributes of enemy
for(var i = 0; i < 36; i++){ // only 24 because of < instead of <=
  var x = Math.floor(Math.random() * 800) + 10;
  var y = Math.floor(Math.random() * 500) + 10;
  var r = 10;

  enemyRadii.push([r, x, y]);
}

var randomX = function(){
  return Math.floor(Math.random() * 880) + 10;
}

var randomY = function(){
  return Math.floor(Math.random() * 580) + 10;
}

var randomDelay = function(){
  return Math.floor(Math.random() * 1000);
}

var randomDuration = function(){
  return Math.floor(Math.random() * 3000);
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);

var player = svgArea.append("circle")
  .attr("cx", 15)
  .attr("cy", 15)
  .attr("r", 10)
  .style("fill", "blue")
  .call(drag);

var enemies = svgArea.selectAll("circle")
    .data(enemyRadii)
    .enter()
    .append("circle");

var sweepers = svgArea.selectAll("rect")
  .data([[450, 0],[450, 600], [0, 0]])
  .enter()
  .append("rect");

var sweepCount = 0;
var sweeperAttr = sweepers
  .attr("width", 30)
  .attr("height", 30)
  .attr("x", function(d){
    if (sweepCount === 0){
      sweepCount++;
      return 0;
    }
    else{
      sweepCount = 0;
      return 870;
    }
  })
  .attr("y", function(d){
    if (sweepCount === 0){
      sweepCount++;
      return 0;
    }
    else{
      sweepCount = 0;
      return 570;
    }
  })
  .style("fill", "orange");

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this)
  .attr('cx', x)
  .attr('cy', y);//.attr("transform", "translate(" + x + "," + y + ")");
}

var prevCollision = false;

// Collision detection - enemies
function checkEnemyCollision(){
  var collision = false;

  enemies.each(function(d, i){
    var xDiff = Math.abs(d[1] - player.attr("cx"));
    var yDiff = Math.abs(d[2] - player.attr("cy"));
    var radiiSum = JSON.parse(d[0]) + JSON.parse(player.attr("r"));
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    if( distance < radiiSum){
      collision = true;
    }
  });

  if(collision){
    score = 0;
    if(collision != prevCollision){
      collisions += 1;
    }
  }
  prevCollision = collision;
}
d3.timer(checkEnemyCollision);


//   // var radiusSum = enemies.attr("r") + player.attr("r");
//   // var xDiff =
//   // var yDiff =
  // var pX = player.attr("cx");
  // var pY = player.attr("cy");
  // var eX = [];
  // var eY = [];

  // enemies.each( function(){
  //   eX.push(enemies.attr("cx"));
  // });


//Loops the enemies movements to random locations with a random delay
function looper(){
    enemies
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
      if (sweepers.attr('x') > 869 && sweepers.attr('y')< 20){//570, width 870
        sweepers.transition()
          .attr("y", 570);
      }
      if(sweepers.attr('x') < 20 && sweepers.attr('y') < 20){
        sweepers.transition()
         .attr("x", 870);
      }

      if(sweepers.attr('x') > 869 && sweepers.attr('y') > 569){
        sweepers.transition()
         .attr("x", 0);
      }
      if(sweepers.attr('x') < 20 && sweepers.attr('y') > 569)
        sweepers.transition()
         .attr("y", 0);
      }

}

looper();

function scoreTick(){
  score = score + 1;
  highScore = Math.max(highScore, score);
  updateScore();
}
setInterval(scoreTick, 100);

function updateScore(){
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .high span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisions);
}
  // force
  //     .nodes(graph.nodes)
  //     .links(graph.links)
  //     .on("tick", tick)
  //     .start();
  // function tick() {
  //   node.attr("height", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
  //       .attr("width", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

  //   link.attr("x1", function(d) { return d.source.x; })
  //       .attr("y1", function(d) { return d.source.y; })
  //       .attr("x2", function(d) { return d.target.x; })
  //       .attr("y2", function(d) { return d.target.y; });
  // }



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