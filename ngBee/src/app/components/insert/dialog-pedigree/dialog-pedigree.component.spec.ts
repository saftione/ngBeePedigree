import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPedigreeComponent } from './dialog-pedigree.component';

describe('DialogPedigreeComponent', () => {
  let component: DialogPedigreeComponent;
  let fixture: ComponentFixture<DialogPedigreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPedigreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPedigreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
