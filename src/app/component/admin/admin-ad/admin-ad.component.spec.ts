import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdComponent } from './admin-ad.component';

describe('AdminAdComponent', () => {
  let component: AdminAdComponent;
  let fixture: ComponentFixture<AdminAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
