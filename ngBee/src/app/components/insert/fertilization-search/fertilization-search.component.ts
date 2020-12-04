import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {InsaminationService} from '../../../_services/insamination.service'


@Component({
  selector: 'app-fertilization-search',
  templateUrl: './fertilization-search.component.html',
  styleUrls: ['./fertilization-search.component.css']
})
export class FertilizationSearchComponent implements OnInit {

  pedigrees: any;

  constructor(private pedigreeService: InsaminationService) { }


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
