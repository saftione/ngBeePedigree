import { Component, OnInit } from '@angular/core';
import {PedigreeService} from '../../_services/pedigree.service'
import { SelectionModel } from '@angular/cdk/collections';
import { PedigreeModel } from '../../model/pedigree.model';
import { MatTableDataSource } from '@angular/material/table';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-pedigree-table',
  templateUrl: './pedigree-table.component.html',
  styleUrls: ['./pedigree-table.component.css']
})
export class PedigreeTableComponent implements OnInit {



  ELEMENT_DATA: PedigreeModel[];
  displayedColumns: string[] = ['user','breeder','name', 'action'];
  dataSource = new MatTableDataSource<PedigreeModel>(this.ELEMENT_DATA);


  selection = new SelectionModel<PedigreeModel>(true, []);
  message: string;

  constructor(
    private pedigreeService: PedigreeService
    ) {

  }


  ngOnInit() {
    this.getAllReports()
  }


  public getAllReports() {

    const userKey = JSON.parse(sessionStorage.getItem(USER_KEY));
    let resp = this.pedigreeService.getAll();
    resp.subscribe(report => this.dataSource.data = report as PedigreeModel[])
  }
}
