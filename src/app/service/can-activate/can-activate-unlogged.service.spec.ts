import { TestBed, inject } from '@angular/core/testing';

import { CanActivateUnloggedService } from './can-activate-unlogged.service';

describe('CanActivateUnloggedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateUnloggedService]
    });
  });

  it('should ...', inject([CanActivateUnloggedService], (service: CanActivateUnloggedService) => {
    expect(service).toBeTruthy();
  }));
});
