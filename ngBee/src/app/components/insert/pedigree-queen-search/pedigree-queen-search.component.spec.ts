import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeQueenSearchComponent } from './pedigree-queen-search.component';

describe('PedigreeSearchComponent', () => {
  let component: PedigreeQueenSearchComponent;
  let fixture: ComponentFixture<PedigreeQueenSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedigreeQueenSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeQueenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
