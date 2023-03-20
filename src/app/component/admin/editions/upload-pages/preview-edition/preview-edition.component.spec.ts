import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEditionComponent } from './preview-edition.component';

describe('PreviewEditionComponent', () => {
  let component: PreviewEditionComponent;
  let fixture: ComponentFixture<PreviewEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
