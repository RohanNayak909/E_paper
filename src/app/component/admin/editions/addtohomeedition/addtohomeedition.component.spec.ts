import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtohomeeditionComponent } from './addtohomeedition.component';

describe('AddtohomeeditionComponent', () => {
  let component: AddtohomeeditionComponent;
  let fixture: ComponentFixture<AddtohomeeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtohomeeditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtohomeeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
