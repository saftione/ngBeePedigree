import { TestBed } from '@angular/core/testing';

import { InsaminationService } from './insamination.service';

describe('InsaminationService', () => {
  let service: InsaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
