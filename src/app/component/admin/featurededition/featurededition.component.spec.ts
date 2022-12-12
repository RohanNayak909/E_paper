import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturededitionComponent } from './featurededition.component';

describe('FeaturededitionComponent', () => {
  let component: FeaturededitionComponent;
  let fixture: ComponentFixture<FeaturededitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturededitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturededitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
