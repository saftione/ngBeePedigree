import { Component, OnInit } from '@angular/core';
import {PedigreeService} from '../../../_services/pedigree.service'
import { MatTableDataSource } from '@angular/material/table';

export interface PedigreeModel {
  _id: string;
  name: string;
  breeder: string;
  fertilization: string;
  fertilizationDate: Date,
  properties: string,
  queen:string;
  drone: string;
  description: String,
  published: Boolean
}

@Component({
  selector: 'app-pedigree-table',
  templateUrl: './pedigree-table.component.html',
  styleUrls: ['./pedigree-table.component.css']
})
export class PedigreeTableComponent implements OnInit {


  displayedColumns: string[] = ['name', 'properties'];
  WarehouseData: any = [];
  dataSource: MatTableDataSource<PedigreeModel>;

  constructor( private pedigreeService: PedigreeService,) { }

  ngOnInit() {
    this.getdata();
  }
  getdata(){
    this.pedigreeService.getAll().subscribe(data => {
      this.WarehouseData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<PedigreeModel>(this.WarehouseData);

    })
  }

  RowData: any;
  currentRowData = null;
  currentIndex = -1;

  setActiveRow(RowData, index) {
    this.currentRowData = RowData;
    this.currentIndex = index;
    console.log(this.currentRowData);
  }

  deleteTutorial(id) {
    this.pedigreeService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          //this.router.navigate(['/tutorials']);
          this.getdata()
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(id,updatedata) {
    this.pedigreeService.update(id, updatedata)
      .subscribe(
        response => {
          console.log(response);
          this.getdata();

        },
        error => {
          console.log(error);
        });
  }

}
