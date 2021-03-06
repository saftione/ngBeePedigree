import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {BreederService} from '../../../_services/breeder.service'

@Component({
  selector: 'app-breeder-search',
  templateUrl: './breeder-search.component.html',
  styleUrls: ['./breeder-search.component.css']
})
export class BreederSearchComponent implements OnInit {

  pedigrees: any;

  constructor(private pedigreeService: BreederService) { }


  @Input() address: FormGroup;

  ngOnInit() {
    this.retrieveServices();
  }


  retrieveServices() {
    this.pedigreeService.getAll()
      .subscribe(
        data => {
          this.pedigrees = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }


}
