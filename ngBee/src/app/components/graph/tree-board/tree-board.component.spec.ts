import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBoardComponent } from './tree-board.component';

describe('TreeBoardComponent', () => {
  let component: TreeBoardComponent;
  let fixture: ComponentFixture<TreeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
