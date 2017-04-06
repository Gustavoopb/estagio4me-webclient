import { TestBed, inject } from '@angular/core/testing';

import { InternshipService } from './internship.service';

describe('InternshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternshipService]
    });
  });

  it('should ...', inject([InternshipService], (service: InternshipService) => {
    expect(service).toBeTruthy();
  }));
});
