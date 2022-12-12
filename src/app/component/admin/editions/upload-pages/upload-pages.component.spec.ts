import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPagesComponent } from './upload-pages.component';

describe('UploadPagesComponent', () => {
  let component: UploadPagesComponent;
  let fixture: ComponentFixture<UploadPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
