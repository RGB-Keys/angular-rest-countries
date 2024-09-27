import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesDetailsComponent } from './countries-details.component';

describe('CountriesDetailsComponent', () => {
  let component: CountriesDetailsComponent;
  let fixture: ComponentFixture<CountriesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountriesDetailsComponent]
    });
    fixture = TestBed.createComponent(CountriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
