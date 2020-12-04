import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizationSearchComponent } from './fertilization-search.component';

describe('FertilizationSearchComponent', () => {
  let component: FertilizationSearchComponent;
  let fixture: ComponentFixture<FertilizationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertilizationSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
