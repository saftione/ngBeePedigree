import { Component, OnInit } from '@angular/core';
import {PedigreeService} from '../../../_services/pedigree.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../casual/confirmation-dialog/confirmation-dialog.component';

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

  constructor( 
    private pedigreeService: PedigreeService,
    public dialog: MatDialog) { }

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

  openDialogConfirm(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result==true){
        this.deleteTutorial(id)
      }
    });
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


}
