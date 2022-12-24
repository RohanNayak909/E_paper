import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdViewComponent } from './admin-ad-view.component';

describe('AdminAdViewComponent', () => {
  let component: AdminAdViewComponent;
  let fixture: ComponentFixture<AdminAdViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
