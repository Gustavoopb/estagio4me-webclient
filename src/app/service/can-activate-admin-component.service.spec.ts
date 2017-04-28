import { TestBed, inject } from '@angular/core/testing';

import { CanActivateAdminComponentService } from './can-activate-adming-component.service';

describe('CanActivateAdminComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAdminComponentService]
    });
  });

  it('should ...', inject([CanActivateAdminComponentService], (service: CanActivateAdminComponentService) => {
    expect(service).toBeTruthy();
  }));
});
