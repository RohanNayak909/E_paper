import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAreaMapComponent } from './create-area-map.component';

describe('CreateAreaMapComponent', () => {
  let component: CreateAreaMapComponent;
  let fixture: ComponentFixture<CreateAreaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAreaMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAreaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
