import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBoardPedigreeComponent } from './tree-board-pedigree.component';

describe('TreeBoardPedigreeComponent', () => {
  let component: TreeBoardPedigreeComponent;
  let fixture: ComponentFixture<TreeBoardPedigreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeBoardPedigreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeBoardPedigreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
