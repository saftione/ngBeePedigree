import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { scaleLinear } from "d3-scale";
import { nest, values } from "d3-collection";
import { mean, min, max, ascending } from "d3-array";
import { mainModule } from 'process';

function main() {

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
