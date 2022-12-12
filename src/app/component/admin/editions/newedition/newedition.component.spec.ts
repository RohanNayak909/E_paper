import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweditionComponent } from './newedition.component';

describe('NeweditionComponent', () => {
  let component: NeweditionComponent;
  let fixture: ComponentFixture<NeweditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeweditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
