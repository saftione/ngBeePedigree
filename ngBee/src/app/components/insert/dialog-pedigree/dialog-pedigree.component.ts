import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PedigreeComponent } from '../pedigree/pedigree.component';

@Component({
  selector: 'app-dialog-pedigree',
  templateUrl: './dialog-pedigree.component.html',
  styleUrls: ['./dialog-pedigree.component.css']
})
export class DialogPedigreeComponent {


  form: FormGroup;
  titel: any;
  search='';




  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PedigreeComponent>,
    @Inject(MAT_DIALOG_DATA) { id, name , user, breeder,fertilization,fertilizationDate,properties,queen,drones,description,published}: Storage) {

      //  wenn auslagerung dann mit kontrakt nr

      this.form = fb.group({
        id: id,
        name:name,
        user: user,
        breeder: breeder,
        fertilization: fertilization,
        fertilizationDate: fertilizationDate,
        properties:properties,
        queen: queen,
        drones: drones,
        description: description,
        published: published
      });

      alert("Queen und Drone müssen ausgewählt werden");


  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
