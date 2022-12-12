import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtohomeComponent } from './addtohome.component';

describe('AddtohomeComponent', () => {
  let component: AddtohomeComponent;
  let fixture: ComponentFixture<AddtohomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtohomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
