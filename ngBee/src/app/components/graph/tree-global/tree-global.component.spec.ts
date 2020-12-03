import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGlobalComponent } from './tree-global.component';

describe('TreeGlobalComponent', () => {
  let component: TreeGlobalComponent;
  let fixture: ComponentFixture<TreeGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
