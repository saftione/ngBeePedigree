import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3v4'
import { pedigreeTree } from '@solgenomics/d3-pedigree-tree'

function main() {

  var nodes = generate_nodes(2,29,2,10);
  
  var tree = pedigreeTree()
    .levelWidth(1000)
    .nodePadding(100)
    .nodeWidth(150)
    .linkPadding(25)
    .parents(function (d) {
      return [d.mother, d.father].filter(Boolean);
    })
    .groupChildless(true)
    .iterations(8)
    .data(nodes);


  // console.log("tree", tree());

  drawTree(tree(), ".canv", 0);
  var s = 999
  var end = false;
  var ended = false;
  var inter = setInterval(function () {
    if (s < 1000 && !(end && ended)) drawTree(tree.iterations(s++)(), ".canv", d3.transition().duration(400).ease(d3.easeLinear));
    if (end) ended = true;
  }, 500);
  const clicky = function () {
    end = true;
    ended = false;
    d3.select("body").on("click", null).on("click", function () {
      d3.select("body").on("click", clicky);
      s = 0
      end = false;
    });
  }
  d3.select("body").on("click", clicky);


  function generate_nodes(num_init, num_breedings, min_children, max_children) {
    var nodes = [];

    console.log("nodes1", nodes);
    var id = 0;
    for (var i = 0; i < num_init; i++) {
      nodes.push({ 'mother': null, 'father': null, 'children': [], 'id': id++, 'level': 0 });
    }
    for (var i = 0; i < num_breedings; i++) {
      let mother = nodes[Math.floor(Math.random() * nodes.length)];
      console.log("mother", mother);
      let father = mother;
      while (father == mother || (father.level !== mother.level)) {
        father = nodes[Math.floor(Math.random() * nodes.length)];
      }
      if (Math.random() > 0.5) {
        father = nodes[Math.floor(Math.random() * nodes.length)];
        while (father == mother) {
          father = nodes[Math.floor(Math.random() * nodes.length)];
        }
      }
      let num_offspring = min_children + Math.floor(Math.random() * (max_children + 1 - min_children));
      for (var j = 0; j < num_offspring; j++) {
        let new_child = { 'mother': mother, 'father': father, 'children': [], 'id': id++, 'level': d3.max([mother.level, father.level]) + 1 };
        mother.children.push(new_child);
        father.children.push(new_child);
        console.log("nodes", new_child);
        nodes.push(new_child);
      }
    }

    return nodes;

  }
  function drawTree(layout, svg_selector, trans) {

    //set default change-transtion to no duration
    trans = trans || d3.transition().duration(0);
    // console.log("trans", trans)
    //make wrapper(pdg)
    // console.log("layout", layout);

    var canv = d3.select(svg_selector);

    // console.log("canv", canv);
    var cbbox = canv.node().getBoundingClientRect();
    // console.log("cbbbox", cbbox);
    var canvw = cbbox.width,
      canvh = cbbox.height;
    var pdg = canv.select('.pedigreeTree');
    if (pdg.empty()) {
      pdg = canv.append('g').classed('pedigreeTree', true);
    }

    //make background
    var bg = pdg.select('.pdg-bg');
    if (bg.empty()) {
      bg = pdg.append('rect')
        .classed('pdg-bg', true)
        .attr('width', canvw)
        .attr('height', canvh)
        .attr('fill', "white")
        .attr('stroke', 'none');
    }


    //make scaled content/zoom groups
    var padding = 50;
    var pdgtree_width = layout.x[1];
    var pdgtree_height = layout.y[1];
    var scale = get_fit_scale(canvw, canvh, pdgtree_width, pdgtree_height, padding);
    var offsetx = (canvw - pdgtree_width * scale) / 2;
    var offsety = (canvh - pdgtree_height * scale) / 2;

    var content = pdg.select('.pdg-content');
    if (content.empty()) {
      var zoom = d3.zoom();
      var zoom_group = pdg.append('g').classed('pdg-zoom', true).data([zoom]);

      content = zoom_group.append('g').classed('pdg-content', true);

      zoom.on("zoom", function () {
        zoom_group.attr('transform', d3.event.transform);
      }).scaleExtent([0.2, 10 / scale]);
      bg.style("cursor", "all-scroll").call(zoom).call(zoom.transform, d3.zoomIdentity);
      bg.on("dblclick.zoom", function () {
        zoom.transform(bg.transition(), d3.zoomIdentity);
        return false;
      });

      content.attr('transform',
        d3.zoomIdentity
          .translate(offsetx, offsety)
          .scale(scale)
      );
    }
    content.transition(trans)
      .attr('transform',
        d3.zoomIdentity
          .translate(offsetx, offsety)
          .scale(scale)
      );


    //set up draw layers
    var linkLayer = content.select('.link-layer');
    if (linkLayer.empty()) {
      linkLayer = content.append('g').classed('link-layer', true);
    }
    var nodeLayer = content.select('.node-layer');
    if (nodeLayer.empty()) {
      nodeLayer = content.append('g').classed('node-layer', true);
    }

    //draw nodes
    var nodes = nodeLayer.selectAll('.node')
      .data(layout.nodes, function (d) { return d.id; });
    var newNodes = nodes.enter().append('g')
      .classed('node', true)
      .attr('transform', function (d) {
        var begin = d;
        if (d3.event && d3.event.type == "click") {
          begin = d3.select(d3.event.target).datum();
        }
        return 'translate(' + begin.x + ',' + begin.y + ')'
      });
    newNodes.append('rect')
      .attr("fill", "#bbb")
      .attr("width", 150)
      .attr("height", 20)
      .attr("y", -10);
    newNodes.append('circle')
      .attr('r', 10)
      .attr('fill', function (d) {
        return d.type == 'node' ? 'black' : 'grey';
      });
    newNodes.append('text')
      .attr('x', '14')
      .attr('y', 5)
      //.text(function (d) { return d.raw_new_sort_ypos });
      .text(function (d) { return d.id });

    var allNodes = newNodes.merge(nodes);
    allNodes.transition(trans).attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    //allNodes.select('text').text(function (d) { return d.raw_new_sort_ypos });
    //allNodes.select('text').text("Test");

    allNodes.filter(function (d) { return d.type == "node-group" })
      .style("cursor", "pointer")
      .on("click", function (d) {
        layout.pdgtree.excludeFromGrouping(d.value.slice(0, 10).map(function (d) { return d.id; }));
        drawTree(layout.pdgtree(), ".canv", d3.transition().duration(700).ease(d3.easeLinear));
      })
      .select("circle")
      .attr('fill', "white")
      .attr('stroke', "black");
    var oldNodes = nodes.exit().remove();

    //link curve generators
    var stepline = d3.line().curve(d3.curveStep);
    var curveline = d3.line().curve(d3.curveBasis);
    var build_curve = function (d) {
      if (d.type == "parent->mid") return curveline(d.path);
      if (d.type == "mid->child") return stepline(d.path);
    };

    //link colors
    var link_color = function (d) {
      if (d.type == "mid->child") return 'green';
      if (d.type == "parent->mid") {
        //if its the first parent, red. Otherwise, blue.
        return d.sinks[0].parents.indexOf(d.source) ? 'blue' : 'red';
      }
      return 'gray';
    }

    //make links
    var links = linkLayer.selectAll('.link')
      .data(layout.links, function (d) { return d.id; });
    var newLinks = links.enter().append('g')
      .classed('link', true);
    newLinks.append('path')
      .attr('d', function (d) {
        var begin = (d.sink || d.source);
        if (d3.event && d3.event.type == "click") {
          begin = d3.select(d3.event.target).datum();
        }
        return curveline([[begin.x, begin.y], [begin.x, begin.y], [begin.x, begin.y], [begin.x, begin.y]]);
      })
      .attr('fill', 'none')
      .attr('stroke', link_color)
      .attr('stroke-width', '2');
    var allLinks = newLinks.merge(links);
    allLinks.transition(trans).select('path').attr('d', build_curve);
    var oldNodes = links.exit().remove();
  }
  function get_fit_scale(w1, h1, w2, h2, pad) {
    w1 -= pad * 2;
    h1 -= pad * 2;
    if (w1 / w2 < h1 / h2) {
      return w1 / w2;
    } else {
      return h1 / h2;
    }
  }
}
@Component({
  selector: 'app-tree-global',
  templateUrl: './tree-global.component.html',
  styleUrls: ['./tree-global.component.css']
})
export class TreeGlobalComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

    main();



  }

}




