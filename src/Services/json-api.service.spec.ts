import { TestBed } from '@angular/core/testing';

import { JSONAPIService } from './json-api.service';

describe('JSONAPIService', () => {
  let service: JSONAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
