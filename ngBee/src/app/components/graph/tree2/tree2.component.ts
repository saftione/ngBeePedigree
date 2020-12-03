import { Component, OnInit } from '@angular/core';
import * as d3 from 'node_modules/d3'
import { scaleLinear } from "d3-scale";
import { nest, values } from "d3-collection";
import { mean, min, max, ascending } from "d3-array";
import { mainModule } from 'process';

function main() {


  var jsondata = {
    "name": "Maude Fernandez",
    "id": "06ada7cd-3078-54bc-bb87-72e9d6f38abf",
    "_parents": [
      {
        "name": "Janie Norton",
        "id": "a39bfa73-6617-5e8e-9470-d26b68787e52",
        "_parents": [
          {
            "name": "Pearl Cannon",
            "id": "fc956046-a5c3-502f-b853-d669804d428f",
            "_parents": [
              {
                "name": "Augusta Miller",
                "id": "fa5b0c07-9000-5475-a90e-b76af7693a57"
              },
              {
                "name": "Clayton Welch",
                "id": "3194517d-1151-502e-a3b6-d1ae8234c647"
              }
            ]
          },
          {
            "name": "Nell Morton",
            "id": "06c7b0cb-cd21-53be-81bd-9b088af96904",
            "_parents": [
              {
                "name": "Lelia Hernandez",
                "id": "667d2bb6-c26e-5881-9bdc-7ac9805f96c2"
              },
              {
                "name": "Randy Welch",
                "id": "104039bb-d353-54a9-a4f2-09fda08b58bb"
              }
            ]
          }
        ]
      },
      {
        "name": "Helen Alvarado",
        "id": "522266d2-f01a-5ec0-9977-622e4cb054c0",
        "_parents": [
          {
            "name": "Gussie Glover",
            "id": "da430aa2-f438-51ed-ae47-2d9f76f8d831",
            "_parents": [
              {
                "name": "Mina Freeman",
                "id": "d384197e-2e1e-5fb2-987b-d90a5cdc3c15"
              },
              {
                "name": "Charlotte Martin",
                "id": "ea01728f-e542-53a6-acd0-6f43805c31a3"
              }
            ]
          },
          {
            "name": "Jesus Pierce",
            "id": "bfd1612c-b90d-5975-824c-49ecf62b3d5f",
            "_parents": [
              {
                "name": "Donald Cox",
                "id": "4f910be4-b827-50be-b783-6ba3249f6ebc"
              },
              {
                "name": "Alex Gonzales",
                "id": "efb2396d-478a-5cbc-b168-52e028452f3b"
              }
            ]
          }
        ]
      }
    ]
  };

console.log()


var boxWidth = 150,
boxHeight = 40;

// Setup zoom and pan
var zoom = d3.behavior.zoom()
.scaleExtent([.1,1])
.on('zoom', function(){
svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
})
// Offset so that first pan and zoom does not jump back to the origin
.translate([150, 200]);

var svg = d3.select("#stammbaum").append("svg")
.attr('width', 1000)
.attr('height', 500)
.call(zoom)
.append('g')
// Left padding of tree so that the whole root node is on the screen.
// TODO: find a better way
.attr("transform", "translate(150,200)");

var tree = d3.layout.tree()
// Using nodeSize we are able to control
// the separation between nodes. If we used
// the size parameter instead then d3 would
// calculate the separation dynamically to fill
// the available space.
.nodeSize([100, 200])
// By default, cousins are drawn further apart than siblings.
// By returning the same value in all cases, we draw cousins
// the same distance apart as siblings.
.separation(function(){
return .5;
})
// Tell d3 what the child nodes are. Remember, we're drawing
// a tree so the ancestors are child nodes.
.children(function(person){
return person._parents;
});

d3.json(jsondata, function(error, data){

if(error) {
return console.error(error);
}

var nodes = tree.nodes(data),
  links = tree.links(nodes);

// Style links (edges)
svg.selectAll("path.link")
  .data(links)
.enter().append("path")
  .attr("class", "link")
  .attr("d", elbow);

// Style nodes    
var node = svg.selectAll("g.person")
  .data(nodes)
.enter().append("g")
  .attr("class", "person")
  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

// Draw the rectangle person boxes
node.append("rect")
  .attr({
    x: -(boxWidth/2),
    y: -(boxHeight/2),
    width: boxWidth,
    height: boxHeight
  });

// Draw the person's name and position it inside the box
node.append("text")
  .attr("dx", -(boxWidth/2) + 10)
  .attr("dy", 0)
  .attr("text-anchor", "start")
  .attr('class', 'name')
  .text(function(d) { 
    return d.name; 
  });
  
});

/**
* Custom path function that creates straight connecting lines.
*/
function elbow(d) {
return "M" + d.source.y + "," + d.source.x
+ "H" + (d.source.y + (d.target.y-d.source.y)/2)
+ "V" + d.target.x 
+ "H" + d.target.y;
}


}

@Component({
  selector: 'app-tree2',
  templateUrl: './tree2.component.html',
  styleUrls: ['./tree2.component.css']
})
export class Tree2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    main();
  }

}
