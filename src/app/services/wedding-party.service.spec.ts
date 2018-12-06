import { TestBed } from '@angular/core/testing';

import { WeddingPartyService } from './wedding-party.service';

describe('WeddingPartyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeddingPartyService = TestBed.get(WeddingPartyService);
    expect(service).toBeTruthy();
  });
});
