import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogPedigreeComponent } from '../dialog-pedigree/dialog-pedigree.component';
import { SelectionModel } from '@angular/cdk/collections';
//import { ConfirmationDialogComponent } from '../../casual/confirmation-dialog/confirmation-dialog.component';
import {PedigreeService} from '../../../_services/pedigree.service'
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.css']
})
export class PedigreeComponent implements OnInit {

  message: string;
  constructor(
    private pedigreeService: PedigreeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllReports()
  }

  public getAllReports() {

    const userKey = JSON.parse(sessionStorage.getItem(USER_KEY));

  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const userKey = JSON.parse(sessionStorage.getItem(USER_KEY));


    dialogConfig.data = {
      id: '',
      type: '1',
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
      type: updatedata.type,
      name: updatedata.name,
      user: vari.id
    };

    const dialogRef = this.dialog.open(DialogPedigreeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      //data => console.log("Dialog output:", data),
      data => this.updateTutorial(data.id,data)
    );
  }

  openDialogConfirm(id) {
      const dialogRef = this.dialog.open(DialogPedigreeComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result==true){
          this.deleteTutorial(id)
        }
      });
  }


  saveTutorial(data) {
    this.pedigreeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          //this.getAllReports()
        },
        error => {
          console.log(error);
        });
  }

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    console.log(this.currentTutorial);
  }

  deleteTutorial(id) {
    this.pedigreeService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          //this.router.navigate(['/tutorials']);
          //this.getAllReports()
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
         // this.getAllReports();
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
}
