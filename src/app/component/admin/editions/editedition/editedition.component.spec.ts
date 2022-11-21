import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeditionComponent } from './editedition.component';

describe('EditeditionComponent', () => {
  let component: EditeditionComponent;
  let fixture: ComponentFixture<EditeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
