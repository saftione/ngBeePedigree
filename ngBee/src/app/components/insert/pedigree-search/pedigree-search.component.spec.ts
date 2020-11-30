import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeSearchComponent } from './pedigree-search.component';

describe('PedigreeSearchComponent', () => {
  let component: PedigreeSearchComponent;
  let fixture: ComponentFixture<PedigreeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedigreeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
