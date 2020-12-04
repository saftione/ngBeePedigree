import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {PedigreeService} from '../../../_services/pedigree.service'



@Component({
  selector: 'app-pedigree-queen-search',
  templateUrl: './pedigree-queen-search.component.html',
  styleUrls: ['./pedigree-queen-search.component.css']
})
export class PedigreeQueenSearchComponent implements OnInit{

  pedigrees: any;

  constructor(private pedigreeService: PedigreeService) { }


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
