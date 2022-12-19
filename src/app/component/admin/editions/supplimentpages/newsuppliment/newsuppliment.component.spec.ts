import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsupplimentComponent } from './newsuppliment.component';

describe('NewsupplimentComponent', () => {
  let component: NewsupplimentComponent;
  let fixture: ComponentFixture<NewsupplimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsupplimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsupplimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
