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



  displayedColumns: string[] = ['id','name'];
  UserData: any = [];
  dataSource: MatTableDataSource<PedigreeModel>;
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
    this.pedigreeService.getAll()
    .subscribe(
      data => {
        this.UserData = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<PedigreeModel>(this.UserData);
      },
      error => {
        console.log(error);
      });


  }
}
