import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhubaneswarPaperComponent } from './bhubaneswar-paper.component';

describe('BhubaneswarPaperComponent', () => {
  let component: BhubaneswarPaperComponent;
  let fixture: ComponentFixture<BhubaneswarPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhubaneswarPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhubaneswarPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
