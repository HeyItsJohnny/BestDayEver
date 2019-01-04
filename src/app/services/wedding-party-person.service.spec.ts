import { TestBed } from '@angular/core/testing';

import { WeddingPartyPersonService } from './wedding-party-person.service';

describe('WeddingPartyPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeddingPartyPersonService = TestBed.get(WeddingPartyPersonService);
    expect(service).toBeTruthy();
  });
});
