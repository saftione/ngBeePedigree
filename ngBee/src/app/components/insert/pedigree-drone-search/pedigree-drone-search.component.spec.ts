import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeDroneSearchComponent } from './pedigree-drone-search.component';

describe('PedigreeDroneSearchComponent', () => {
  let component: PedigreeDroneSearchComponent;
  let fixture: ComponentFixture<PedigreeDroneSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedigreeDroneSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeDroneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
