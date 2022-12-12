import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplimentpagesComponent } from './supplimentpages.component';

describe('SupplimentpagesComponent', () => {
  let component: SupplimentpagesComponent;
  let fixture: ComponentFixture<SupplimentpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplimentpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplimentpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
