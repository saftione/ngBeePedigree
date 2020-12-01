import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeTableComponent } from './pedigree-table.component';

describe('PedigreeTableComponent', () => {
  let component: PedigreeTableComponent;
  let fixture: ComponentFixture<PedigreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedigreeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
