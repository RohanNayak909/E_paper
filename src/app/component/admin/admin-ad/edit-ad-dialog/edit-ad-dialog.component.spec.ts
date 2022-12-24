import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdDialogComponent } from './edit-ad-dialog.component';

describe('EditAdDialogComponent', () => {
  let component: EditAdDialogComponent;
  let fixture: ComponentFixture<EditAdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
