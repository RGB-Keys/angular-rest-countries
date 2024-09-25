import { TestBed } from '@angular/core/testing';

import { CountriesListService } from './countries-list.service';

describe('CountriesListService', () => {
  let service: CountriesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});