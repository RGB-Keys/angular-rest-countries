import { TestBed } from '@angular/core/testing';

import { PaginateService } from './paginate.service';

describe('PaginateService', () => {
  let service: PaginateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
