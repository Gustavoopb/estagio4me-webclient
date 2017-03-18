import { TestBed, inject } from '@angular/core/testing';

import { ExtendedHttp } from './extended-http.service';

describe('ExtendedHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendedHttp]
    });
  });

  it('should ...', inject([ExtendedHttp], (service: ExtendedHttp) => {
    expect(service).toBeTruthy();
  }));
});
