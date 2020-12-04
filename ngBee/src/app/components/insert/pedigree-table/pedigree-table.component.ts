
import { PedigreeService } from '../../../_services/pedigree.service'
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Inject, AfterViewInit, } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogPedigreeComponent } from '../dialog-pedigree/dialog-pedigree.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
const USER_KEY = 'auth-user';

export interface PedigreeModel {
  _id: string;
  name: string;
  breeder: string;
  fertilization: string;
  fertilizationDate: Date,
  properties: string,
  queen: string;
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
  div1: boolean = false;
  div2: boolean = false;
  div1Function() {
    this.div1 = true;
    this.div2 = false;
  }
  div2Function() {
    this.div1 = false;
    this.div2 = true;
  }

  displayedColumns: string[] = ['name', 'breeder', 'properties'];
  WarehouseData: any = [];
  dataSource: MatTableDataSource<PedigreeModel>;


  constructor(
    private pedigreeService: PedigreeService,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getdata();

  }

  getdata() {
    this.pedigreeService.getAll().subscribe(data => {
      this.WarehouseData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<PedigreeModel>(this.WarehouseData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


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


  saveTutorial(data) {
    this.pedigreeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.getdata()
        },
        error => {
          console.log(error);
        });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const userKey = JSON.parse(sessionStorage.getItem(USER_KEY));


    dialogConfig.data = {
      id: '',
      name: '',
      breeder: '',
      fertilization: '',
      fertilizationDate: '',
      properties: '',
      queen: '',
      drones: '',
      description: '',
      published: '',
      user: userKey.id
    };

    const dialogRef = this.dialog.open(DialogPedigreeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      //data => console.log("Dialog output:", data),
      data => this.saveTutorial(data)
    );
  }

  openDialogUpdate(updatedata) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const vari = JSON.parse(sessionStorage.getItem(USER_KEY));

    dialogConfig.data = {
      id: updatedata.id,
      name: updatedata.name,
      breeder: updatedata.breeder._id,
      fertilization: updatedata.fertilization,
      fertilizationDate: updatedata.fertilizationDate,
      properties: updatedata.properties,
      queen: updatedata.queen,
      drones: updatedata.drones,
      description: updatedata.description,
      published: updatedata.published,
      user: vari.id
    };

    const dialogRef = this.dialog.open(DialogPedigreeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      //data => console.log("Dialog output:", data),
      data => this.updateTutorial(data.id, data)
    );
  }
  updateTutorial(id, updatedata) {
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
