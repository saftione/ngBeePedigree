import { Component, OnInit, Input } from '@angular/core';
import { Layout, Edge, Node } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
import { stepRound } from './customStepCurved';

export class Bee {
  id: string;
  name: string;
  queenBee?: string;
  droneBee?: string;
}

@Component({
  selector: 'app-tree-board',
  templateUrl: './tree-board.component.html',
  styleUrls: ['./tree-board.component.css']
})
export class TreeBoardComponent {

  @Input() bee: Bee[] = [];
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public curve: any = stepRound;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {
    this.bee = [
      {
        id: '1',
        name: 'B1',
      },
      {
        id: '2',
        name: 'B2',
      },
      {
        id: '3',
        name: 'B3',
        queenBee: '1',
        droneBee: '2'
      },
      {
        id: '4',
        name: 'B4',
        queenBee: '1',
        droneBee: '2'
      },
      {
        id: '5',
        name: 'B5',
        queenBee: '4',
        droneBee: '3'
      }
    ];
  }

  public ngOnInit(): void {
    for (const bee of this.bee) {
      const node: Node = {
        id: bee.id,
        label: bee.name,
      };

      this.nodes.push(node);
    }

    for (const bee of this.bee) {
      if (!bee.queenBee) {
        continue;
      }

      const edge: Edge = {
        source: bee.queenBee,
        target: bee.id,
      };

      this.links.push(edge);
    }

    for (const bee of this.bee) {
      if (!bee.droneBee) {
        continue;
      }

      const edge: Edge = {
        source: bee.droneBee,
        target: bee.id,
      };

      this.links.push(edge);
    }
  }

 
}

