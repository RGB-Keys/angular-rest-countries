import { TestBed } from '@angular/core/testing';

import { SearchPaginateFilterService } from './search-paginate-filter.service';

describe('SearchPaginateFilterService', () => {
  let service: SearchPaginateFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPaginateFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});