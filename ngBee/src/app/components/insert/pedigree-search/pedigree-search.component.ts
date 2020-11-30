import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {PedigreeService} from '../../../_services/pedigree.service'

import { PedigreeModel } from '../../../model/pedigree.model';


@Component({
  selector: 'app-pedigree-search',
  templateUrl: './pedigree-search.component.html',
  styleUrls: ['./pedigree-search.component.css']
})
export class PedigreeSearchComponent implements OnInit{

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
