import { TestBed, inject } from '@angular/core/testing';

import { LedgerServiceService } from './ledger-service.service';

describe('LedgerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedgerServiceService]
    });
  });

  it('should be created', inject([LedgerServiceService], (service: LedgerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
