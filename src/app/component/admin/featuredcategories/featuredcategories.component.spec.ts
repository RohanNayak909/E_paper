import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedcategoriesComponent } from './featuredcategories.component';

describe('FeaturedcategoriesComponent', () => {
  let component: FeaturedcategoriesComponent;
  let fixture: ComponentFixture<FeaturedcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
