import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeGraphBoardComponent } from './pedigree-graph-board.component';

describe('PedigreeGraphBoardComponent', () => {
  let component: PedigreeGraphBoardComponent;
  let fixture: ComponentFixture<PedigreeGraphBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedigreeGraphBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeGraphBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
